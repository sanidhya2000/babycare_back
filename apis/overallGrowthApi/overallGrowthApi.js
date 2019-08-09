const express = require ('express');
const overallGrowthRoute = express.Router();

overallGrowthRoute.get('/',(req,res)=>{
    res.json("overall Growth Api Needs to be Written here")
})


module.exports = overallGrowthRoute;