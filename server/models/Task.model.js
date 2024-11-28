const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    taskTitle : {type: String , require:true},
    description : {type: String , require:true},
    due_date : {type:String , require:true},
    priority: {type:String , required:true},
    status : {type:String , required:true},
    project_id : {type:String , required:true},
    manager_id : {type:String , require:true},
    member_id : {type:String , required:true}
}) 

const Taskmodel = mongoose.model("tasks",taskSchema)

module.exports = {Taskmodel}