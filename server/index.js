const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const cors = require("cors");
const { connection } = require("./config/db");
const {Usermodel} = require("./models/User.model");
const { Authenticate } = require("./middlewares/Authenticate");
const { projectRouter } = require("./Routes/project.routes");

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json())

//Base URL
app.get("/", (req,res)=>{
     res.send("This is base url")
})

//Login - POST
app.post("/login", async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await Usermodel.findOne({email,password});
        console.log(user)
        const token = jwt.sign({userID:user._id}, process.env.JWT_SECRET);
        res.send({message:"Login successfull",user:user ,token:token , isLogged : true})

    } catch (error) {
        res.send({message:"Login Failed", isLogged : false})
    }
})

app.use(Authenticate)

app.use("/projects" ,projectRouter)






app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("Connected to DB")

    } catch (error) {
        console.log("error connecting to DB");
        console.log(error)
    }

    console.log("Listing on PORT 8080")
})









    //if(!user){
    //     return res.send("user does not exist, please create user");
    // } 
    // const hash = user?.password
    // bcrypt.compare(password,hash,function(err,result){
    //     if(result){
    //         const token = jwt.sign({userID:user._id}, "secret");
    //         res.send({message:"Login successfull", token:token})
    //     }
    //     else{
    //         res.send({message:"Login Failed"})
    //     }
    // })
