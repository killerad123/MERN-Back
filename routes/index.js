var express = require('express');
var router = express.Router();
var userModel = require("./users");
var movieModel = require("./movieModel");
const passport = require('passport');
const localStratergy = require("passport-local")

/* GET home page. */

passport.use(new localStratergy(userModel.authenticate()))

router.get("/",(req,res)=>{
  res.send("/")
})

router.get('/getAllMovies',async function(req, res, next) {
  const data = await movieModel.find()
  // console.log(data)
  // res.render('homePage',{data:data});
  res.send(data)
});

router.post("/register",async(req,res)=>{
  const data = await new userModel({
    username:req.body.username,
    email:req.body.email
  })
  userModel.register(data,req.body.password)
  .then(function(user){
    passport.authenticate("local")(req,res,function(){
      res.sendStatus(200)
    })
  })
})

router.get("/:movieName"),(req,res)=>{
  res.send(req.params.movieName)
}

router.get("/bookings",(req,res)=>{

})

router.get("/admin",(req,res)=>{
  res.send("admin")
})
router.get("/show",(req,res)=>{
  res.send("show")
})
router.get("/login",(req,res)=>{
  res.redirect("/loginFailed")
})
router.post("/login",passport.authenticate("local",{
  successRedirect:"/userprofile",
  failureRedirect:"/loginFailed"
}),(req,res)=>{
})
router.get("/userprofile",isLoggedIn,(req,res)=>{
  res.send("hii")
})
router.get('/loginFailed', (req, res) => {
  // Handle failed login here, for instance:
  res.sendStatus(404)// Send a status and message
});
router.get("/logout",function(req,res,next){
  req.logOut(function(err){
    if(err) {return next(err)}
    res.redirect("/")
  })
})
router.get("/abhi",(req,res)=>{
  res.status(200).send('OK');
})

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/loginFailed")
}


module.exports = router;
