const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const {userModel} = require("../Model/User.model")
const {authentication}=require("../middlewares/authentication")
const { bmiModel } = require("../Model/bmi.model")
const UserController=Router()

UserController.post("/signup",(req,res)=>{
    const {name,email,password,age}=req.body

    bcrypt.hash(password,4,async function(err,hash){
        if(err){
            res.send("Something Went WRong")
        }
        const user= new userModel({
            name,
            email,
            password:hash,
            age
        })
        try{
            await user.save()
        res.send({msg:"Signup suc"})
        }
        catch(err){
            console.log(err)
            res.send({msg:"Something Went wrong"})
        }
        
    })
    
})

UserController.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    const hash=user.password
    bcrypt.compare(password,hash,async function(err,result){
        if(err){
            res.json("Something went WRog..")
        }
        if(result){
            const token=jwt.sign({userId:user._id},process.env.JWTSECRET)
            res.send({msg:"Login Successfull",token})
        }
        else{
            res.json("Email or password Wrong..")
        }
    })
    
})
UserController.get("/getprofile",authentication,async(req,res)=>{
    const {userId}=req.body
    const user=await userModel.findOne({_id:userId})
    const {name,email}=user
    res.send({"Email":email,"Name":name})
})

UserController.post("/calculatebmi",authentication,async(req,res)=>{
    const {height,weight,userId}=req.body
    const height_in_meter=Number(height)*0.3048
    const BMI=Number(weight)/(height_in_meter)**2
    const new_bmi=new bmiModel({
        BMI,
        height:height_in_meter,
        weight,
        userId
    })
    await new_bmi.save()
    res.send({BMI})

})
UserController.get("/getcalculation",authentication,async(req,res)=>{
    const {user_id}=req.body
    const all_bmi=await bmiModel.find({user_id})
    res.send({all_bmi})

})

module.exports={
    UserController
}