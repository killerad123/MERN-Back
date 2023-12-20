const mongoose = require("mongoose")
const movieSchema = mongoose.Schema({
    title:String,
    desc:String,
    uploadedBy:{
        default:null,
        type:mongoose.Schema.Types.ObjectId,
        ref:"adminModel"
    }
})

module.exports = mongoose.model("movies",movieSchema)