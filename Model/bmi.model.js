const mongoose=require("mongoose")
const bmiSchema=new mongoose.Schema({
    BMI:{type:Number,required:true},
    height:{type:String,required:true},
    weight:{type:String,required:true},
    userId:{type:String,required:true},

},{
    timestamps:true
})
const bmiModel=mongoose.model("bmi",bmiSchema)

module.exports={
    bmiModel
}