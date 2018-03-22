require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/cofig")
var express=require("express")
var body=require("body-parser")

const _ =require("lodash")

var {mon}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Mongoose-Config")
var {NEW}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Todo-Model")
var {User}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Mongoose-User")
var {authenticate}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Middleware")

var {ObjectID}=require("mongodb")

var app1=express()
const port=process.env.PORT || 3000
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

app1.post("/User",(req,res)=>{
    var dash=_.pick(req.body,["email","password"])
    var Users = new User(dash)
    Users.save().then((doc)=>{
       return Users.generateAuthToken()
        //res.send(doc)

    }).then((token)=>{
        res.header("x-auth",token).send(Users)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})
// this  method is for generating a login and checcking if email is already present or not if yes
// it will send back the details if not or changed it wi
app1.post("/User/login",(req,res)=>{
    var dash= _.pick(req.body,["email","password"])
    console.log(dash)

    User.findByCredentials(dash.email,dash.password).then((doc)=>{
        return doc.generateAuthToken().then((token)=>{
            res.header("x-auth",token).send(doc)
        })

        //res.send(doc)
    }).catch((e)=>{
        res.status(400).send()
    })

})




app1.get("/User/me",authenticate,(req,res)=>{
   res.send(req.doc)
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
        res.send(e)

    })
})


app1.delete("/vishal/:id",(req,res)=>{
    var id=req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    NEW.findByIdAndRemove(id).then((doc)=>{
        if(!doc){
            res.status(404).send()
        }
        res.send({doc})
    }).catch((e)=>{
        res.send(e)
    })
})


app1.patch("/vishal/:id",(req,res)=>{
    var id = req.params.id
    var body= _.pick(req.body,["text",'completed'])
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt=new Date().getTime()
    }else{
        body.completed=false
        body.completedAt=null
    }
    NEW.findByIdAndUpdate(id,  {$set:body},{new: true}).then((doc)=>{
        if(!doc){
            return res.status(404).send()
        }
        res.send({doc})
    }).catch((e)=>{
        res.status(400).send()
    })

})




app1.listen(port,()=>{
    console.log("connected to 3000")
})


module.exports={app1}