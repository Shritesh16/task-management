const express = require("express");
const { Projectmodel } = require("../models/Project.model");
const projectRouter = express.Router();
 
// Get projects by manager_id
projectRouter.get("/:manager_id", async (req, res) => {
    try {
        const manager_id = req.params.manager_id;
        if (!manager_id) {
            return res.status(400).json({ message: "Manager ID is required" });
        }
        const projects = await Projectmodel.find({ manager_id });
        if (projects.length === 0) {
            return res.status(404).json({ message: "No projects found for this manager" });
        }
 
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to get projects", error: error.message });
    }
});
 
// Create a new project
projectRouter.post("/create", async (req, res) => {
    try {
        const { title, description, manager_id } = req.body;
        if (!title || !description || !manager_id) {
            return res.status(400).json({ message: "Title, description, and manager ID are required" });
        }
 
        const project = await Projectmodel.create({ title, description, manager_id });
        res.status(201).json({ project });
    } catch (error) {
        res.status(500).json({ message: "Failed to create project", error: error.message });
    }
});
 
// Update a project by ID
projectRouter.patch("/:projectID", async (req, res) => {
    try {
        const projectID = req.params.projectID;
        const payload = req.body;
 
        const updatedProject = await Projectmodel.findByIdAndUpdate(projectID, payload, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
 
        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        res.status(500).json({ message: "Failed to update project", error: error.message });
    }
});
 
// Delete a project by ID
projectRouter.delete("/:projectID", async (req, res) => {
    try {
        const projectID = req.params.projectID;
 
        const deletedProject = await Projectmodel.findByIdAndDelete(projectID);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
 
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete project", error: error.message });
    }
});
 
module.exports = { projectRouter };