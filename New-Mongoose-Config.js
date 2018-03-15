var mon=require("mongoose")
mon.Promise=global.Promise

mon.connect("mongodb://127.0.0.1:27017/TodoApp")

module.exports={mon}