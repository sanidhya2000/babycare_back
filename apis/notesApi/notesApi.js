const express = require ('express');
const notesRoute = express.Router();

notesRoute.get('/',(req,res)=>{
    res.json("Notes Api Needs to be Written here")
})


module.exports = notesRoute;