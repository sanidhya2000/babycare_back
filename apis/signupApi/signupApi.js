//this is use to user regstertion if he or she enter first time only

const express = require ('express');
const signupRoute = express.Router();

signupRoute.get('/',(req,res)=>{
    res.json("signup Aip Api Needs to be Written here")
})


module.exports = signupRoute;