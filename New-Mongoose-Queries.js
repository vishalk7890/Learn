var {mon}= require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Mongoose-Config")
var {NEW}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Todo-Model")
var {ObjectID}=require("mongodb")
var id ='5aaa14c004f170250a312d69'


NEW.findById(id).then((doc)=>{
    if(!doc){
        return console.log("cannot find it")
    }
    console.log(doc)
}).catch((e)=>{
    console.log(e)
})
//
// NEW.findOne({
//     _id:id
// }).then((doc)=>{
//     return console.log(doc )
// })