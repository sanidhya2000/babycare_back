const express = require ('express');
const apiRoute = express.Router();

const blogsRoute=require('./blogsApi/blogsApi')
const nutritionRoute=require('./nutritionApi/nutritionApi')
const overallGrowthRoute=require('./overallGrowthApi/overallGrowthApi')
const vaccinationRoute=require('./vaccinationApi/vaccinationApi')
const notesRoute=require('./notesApi/notesApi')


apiRoute.use('/blogs',blogsRoute);
apiRoute.use('/vaccination',vaccinationRoute);
apiRoute.use('/notes',notesRoute);
apiRoute.use('/nutrition',nutritionRoute);
apiRoute.use('/overallGrowth',overallGrowthRoute);
apiRoute.get('/',(req,res)=>{
    res.json("Inside Apis add slash for more")
})

module.exports=apiRoute;