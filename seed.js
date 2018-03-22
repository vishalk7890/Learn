const {ObjectID}=require("mongodb")
var {NEW}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Todo-Model")
var {User}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Mongoose-User")

const jwt=require("jsonwebtoken")

var userOneId=new ObjectID()
const usertwoId= new ObjectID()
var user=[{
    _id:userOneId,
    email:"kfajn@dnv.com",
    password :"useronepass",
    tokens:[{
        access:"auth",
        token:jwt.sign({_id:userOneId,access:"auth"},"abc123").toString
    }]
},{
    _id:usertwoId,
    email:"afas@as.com",
    password:"usertwopass"
}]


var eg=[{
    _id: new ObjectID(),
    text:"first test todo",
    competed: true,
    completedAt: 1234
},{
    _id:new ObjectID(),
    text:"second",
    competed: true,
    completedAt: 123
}]

const populate = (done)=>{
    NEW.remove({}).then(()=>{
        return NEW.insertMany(eg)
        //done()
    }).then(()=>{
        done()
    })
}
const pop=(done)=>{
    User.remove({}).then(()=>{
        var userone=new User(user[0]).save()
        var usertwo = new User(user[1]).save()
        return Promise.all([userone,usertwo])
    }).then(()=>{
        done()
    })
}

module.exports={eg,populate,pop,user}