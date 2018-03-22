var mon=require("mongoose")
mon.Promise=global.Promise

mon.connect(process.env.MONGODB_URI)

module.exports={mon}