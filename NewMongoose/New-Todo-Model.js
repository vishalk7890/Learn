var mongoose=require("mongoose")
var NEW= mongoose.model("LISTEN",{
    text:{
        type: String,
        required: true,
        max:12
    },
    email:{
        type: String,
        min:1
    }
})
module.exports={NEW}