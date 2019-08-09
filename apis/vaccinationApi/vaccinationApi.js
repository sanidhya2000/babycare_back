const express = require ('express');
const vaccinationRoute = express.Router();

vaccinationRoute.get('/',(req,res)=>{
    res.json("Vaccination Api Needs to be Written here")
})


module.exports = vaccinationRoute;