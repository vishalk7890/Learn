var express=require("express")
var body=require("body-parser")

var {mon}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Mongoose-Config")
var {NEW}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Todo-Model")
var {ObjectID}=require("mongodb")

var app1=express()

app1.use(body.json())

app1.post("/vishal",(req,res)=>{
    var NEW1= new NEW({
        text:req.body.text
    })
    NEW1.save().then((docs)=>{
        res.send(docs)
    },(e)=>{
        res.status(400).send(e)
    })

})


app1.get("/vishal",(req,res)=>{
    NEW.find().then((tod)=>{
        res.send(tod)
    },(e)=>{
        res.status(400).send(e)
    })
})
app1.get("/vishal/:id",(req,res)=>{
    var id =req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    NEW.findById(id).then((doc)=>{
        if(!doc){
            res.status(404).send()
        }
        res.send({doc})
        console.log("found")
    }).catch((e)=>{
        res.status(400).send()
    })
})


app1.listen(3000,()=>{
    console.log("connected to 3000")
})


module.exports={app1}