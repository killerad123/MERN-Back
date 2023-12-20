const mongoose  = require("mongoose")
mongoose.connect("mongodb://localhost/dbname")
const userSchema = mongoose.Schema({
  username:String,
  password:String,
  bookings:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"movieModel"
    }
  ]
})
var plm = require("passport-local-mongoose")
userSchema.plugin(plm)
module.exports = mongoose.model("user",userSchema)