const express = require ('express');
const blogsRoute = express.Router();

blogsRoute.get('/',(req,res)=>{
    res.json("Blogs Api Needs to be Written here")
})


module.exports = blogsRoute;