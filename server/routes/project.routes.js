const express = require("express");
const projectRouter = express.Router();

projectRouter.get("/",async(req,res)=>{
    try {
        res.send("Get projects working")
    } catch (error) {
        res.send({message:"Failed to get projects"})
    }
})

projectRouter.post("/create",async(req,res)=>{
    try {
        res.send("post projects working")
    } catch (error) {
        res.send({message:"Failed to post projects"})
    }
})

 // need id   -- /:id
projectRouter.patch("/patch",async(req,res)=>{
    try {
        res.send("patch projects working")
    } catch (error) {
        res.send({message:"Failed to patch projects"})
    }
})
// need id   -- /:id
projectRouter.delete("/delete",async(req,res)=>{
    try {
        res.send("delete projects working")
    } catch (error) {
        res.send({message:"Failed to delete projects"})
    }
})




module.exports = {projectRouter}