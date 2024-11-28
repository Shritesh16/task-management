const express = require("express")
// const {Taskmodel} = require("../models/Task.model");
//const { Projectmodel } = require("../models/Project.model");
const {Usermodel} = require("../models/User.model")
const userRouter = express.Router();



userRouter.get("/",async(req,res)=>{
    try {
        const { manager_id, member_id } = req.query;
     
        if (!manager_id) {
          return res.status(400).send({ message: "manager_id is required" });
        }
     
        // If member_id is explicitly "null" or not provided
        if (!member_id || member_id === "null") {
          // Case 1: Fetch manager and team members
          const manager = await Usermodel.findOne({ _id: manager_id }, "_id name");
          if (!manager) {
            return res.status(404).send({ message: "Manager not found" });
          }
     
          const teamMembers = await Usermodel.find(
            { manager: manager_id },
            "_id name"
          );
     
          // Include manager's details in the teamMembers array
          const team = [
            { _id: manager._id, name: manager.name },
            ...teamMembers.map((member) => ({
              _id: member._id,
              name: member.name,
            })),
          ];
     
          return res.status(200).send({ teamMembers: team });
        } else {
          // Case 2: Fetch only the specified member
          const member = await Usermodel.findOne({ _id: member_id }, "_id name");
          if (!member) {
            return res.status(404).send({ message: "Member not found" });
          }
     
          return res.status(200).send({
            teamMembers: [{ _id: member._id, name: member.name }],
          });
        }
      } catch (error) {
        console.error(error);
    return res
      .status(500)
      .send({ message: "An error occurred while fetching users" });
    }
})






module.exports = { userRouter };