const express = require("express")
const {Taskmodel} = require("../models/Task.model");
//const { Projectmodel } = require("../models/Project.model");
const {Usermodel} = require("../models/User.model")
const taskRouter = express.Router();

taskRouter.get("/:project_id", async (req, res) => {
    try {
      const { project_id } = req.params;
      const { user_id, role, page = 1, limit = 10, search = "" } = req.query;
   
      // Convert page and limit to integers
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
   
      // Create search filter (case-insensitive)
      const searchFilter = search
        ? { taskTitle: { $regex: search, $options: "i" } }
        : {};
   
      let tasks;
      let totalTasks;
   
      if (role === "Manager") {
        // Manager can see all tasks in the project
        tasks = await Taskmodel.find({ project_id, ...searchFilter })
          .skip((pageNum - 1) * limitNum) // Skip documents for pagination
          .limit(limitNum); // Limit the number of documents per page
   
        totalTasks = await Taskmodel.countDocuments({ project_id, ...searchFilter });
      } else if (role === "Team-Member") {
        // Member can only see tasks assigned to them
        tasks = await Taskmodel.find({ project_id, member_id: user_id, ...searchFilter })
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum);
   
        totalTasks = await Taskmodel.countDocuments({
          project_id,
          member_id: user_id,
          ...searchFilter,
        });
      } else {
        return res.status(403).json({ message: "Invalid role" });
      }
   
      res.status(200).json({
        total: totalTasks,
        currentPage: pageNum,
        totalPages: Math.ceil(totalTasks / limitNum),
        limit: limitNum,
        tasks,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// taskRouter.get("/:project_id" , async(req,res)=>{
//     try {
//         const { project_id } = req.params;
//         const { user_id, role } = req.query
        
//         let tasks;

//         if (role === "Manager") {
//             // Manager can see all tasks in the project
//             tasks = await Taskmodel.find({ project_id });
//           } else if (role === "Team-Member") {
//             // Member can only see tasks assigned to them
//             tasks = await Taskmodel.find({ project_id, member_id: user_id });
//           } else {
//             return res.status(403).json({ message: "Invalid role" });
//           }
       
//           res.status(200).json(tasks);
       

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// })


taskRouter.post("/create", async (req, res) => {
    try {
        const { taskTitle, description, due_date, priority, status, project_id, manager_id, member_id} = req.body;
        
        const tasks = await Taskmodel.create({ taskTitle, description, due_date, priority, status, project_id, manager_id, member_id});
        res.status(201).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Failed to create project", error: error.message });
    }
});

// Update a task by ID
taskRouter.patch("/:task_id", async (req, res) => {
    try {
        const taskID = req.params.task_id;
        const payload = req.body;
 
        const updatedTask = await Taskmodel.findByIdAndUpdate(taskID, payload, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
 
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to update task", error: error.message });
    }
});

//Note : also add authorisation so that only manager can only delete users like that



module.exports = { taskRouter };