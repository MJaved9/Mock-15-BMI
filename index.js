const express=require("express")
const {connection} = require("./Config/db")
const {UserController}=require("./Routes/user.routes")

const cors=require("cors")
const PORT=8080

const app=express()
app.use(express.json())
app.use(cors())

app.get("/",async(req,res)=>{
    const data=await noteModel.find()
    res.send(data)
})
app.use("/user",UserController)
app.listen(PORT,async()=>{
    try{
        await connection
        console.log("DB Connection Ok")
    }
    catch(err){
        console.log("Error i DB",err)
    }
    console.log(`Listening on PORT ${PORT}`)
})