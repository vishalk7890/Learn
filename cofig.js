var env = process.env.NODE_ENV || "production"

if(env==="production"){
    process.env.PORT=3000
    process.env.MONGODB_URI="mongodb://127.0.0.1:27017/TodoApp"

}else if(env==="test"){
    process.env.PORT=3000
    process.env.MONGODB_URI="mongodb://127.0.0.1:27017/TodoTest"
}