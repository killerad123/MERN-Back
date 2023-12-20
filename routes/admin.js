var express = require('express');
var router = express.Router()
const adminModel = require("./adminModel");
const movieModel = require('./movieModel');

router.post("/",async(req,res)=>{
    const data = await new adminModel({
        username:req.body.username,
        password:req.body.password
    })
    data.save()
    res.send(data)
})
router.get("/upload",(req,res)=>{
    res.send("uploaded")
})
// router.get("/upload",async(req,res)=>{
//     const data = await new movieModel({
//       title:"duncky",
//       desc:"nice film"
//     })
//     data.save()
//     res.send(data)
//     })
router.get("/profile",async (req,res)=>{
    const data = await movieModel.find()
    // res.render("adminProfile",{data:data})
    res.send(data)
})
// router.get("/")

module.exports = router