var {User}=require("/home/dhawal/WebstormProjects/weather-app/mongo-todo-api/NewMongoose/New-Mongoose-User")
let authenticate=(req,res,next)=>{
    var token=req.header("x-auth")

    User.findByToken(token).then((doc)=>{
        if(!doc){
            return Promise.reject()
        }
        req.doc=doc
        req.token=token
        next()
        //console.log(doc)
    }).catch((e)=>{
        res.status(401).send()
    })

}
module.exports={authenticate}