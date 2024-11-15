const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title : {type: String , require:true},
    description : {type: String , require:true},
    manager_id : {type:String , require:true}
}) 

const Projectmodel = mongoose.model("projects",projectSchema)

module.exports = {Projectmodel}