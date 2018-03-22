const mongoose=require("mongoose")
const validator =require("validator")
const jwt=require("jsonwebtoken")
const _=require("lodash")
const bcrypt=require("bcryptjs")


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)


            }, message: "email is not valid"

        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]




})

UserSchema.methods.toJSON=function () {
    var Users=this
    var userobject= Users.toObject()
    return _.pick(userobject,["_id","email"])
}
UserSchema.statics.findByToken=function (token) {
    var Users=this
    var decoded;
    try{
        decoded=jwt.verify(token,"abc123")
    }catch (e){
        return Promise.reject("test")
    }
    return Users.findOne({
        "_id":decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'

    })

}



UserSchema.methods.generateAuthToken= function () {
    var Users = this
    var access="auth"
    var token= jwt.sign({
        _id:Users._id.toHexString(),access
    },"abc123").toString()

    Users.tokens.push({
        access,token
    }   )
    return Users.save().then(()=>{
        return token
    })
}


UserSchema.statics.findByCredentials=function (email,password) {
    var Users=this
    return Users.findOne({email}).then((doc)=>{

        if(!doc){
            console.log("cannot find")
            return Promise.reject()
        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,doc.password,(err,res)=>{
                if(res){
                    resolve(doc)
                }
                else{
                    reject()
                }
            })
        })

    })
}

UserSchema.pre("save",function (next) {
    var Users=this
    if(Users.isModified("password")){
       // var pass = _.pick(Users.toObject(), ["password"])
        //console.log(pass)
        bcrypt.genSalt(5, (err, salt) => {
            bcrypt.hash(Users.password, salt, (err, hash) => {
                Users.password=hash
                next()
               // console.log(pass)
            })


        })
    }
    else{
        next()
    }


})



var User= mongoose.model("User",UserSchema)

module.exports={User}