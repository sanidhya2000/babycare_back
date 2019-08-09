const express = require ('express');
const nutritionRoute = express.Router();

nutritionRoute.get('/',(req,res)=>{
    res.json("Nutrition Api Needs to be Written here")
})

module.exports=nutritionRoute;