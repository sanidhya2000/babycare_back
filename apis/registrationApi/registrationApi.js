//this is use for login and after that it redirect to home page;

const express = require ('express');
const notesRoute = express.Router();

notesRoute.get('/',(req,res)=>{
    res.json("Registrations Api Needs to be Written here")
})


module.exports = notesRoute;