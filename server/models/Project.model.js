const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title : {type: String , require:true},
    description : {type: String , require:true},
    manager_id : {type:String , require:true},
    team : {type:[String], required:true }
}) 

const Projectmodel = mongoose.model("projects",projectSchema)

module.exports = {Projectmodel}