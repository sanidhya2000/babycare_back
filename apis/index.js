const express = require ('express');
const apiRoute = express.Router();


//this define all the internal route
const blogsRoute=require('./blogsApi/blogsApi');
const nutritionRoute=require('./nutritionApi/nutritionApi');
const overallGrowthRoute=require('./overallGrowthApi/overallGrowthApi');
const vaccinationRoute=require('./vaccinationApi/vaccinationApi');
const notesRoute=require('./notesApi/notesApi');
const loginRoute=require('./loginApi/loginApi');
const signupRoute=require('./signupApi/signupApi');
const registrationRoute=require('./registrationApi/registrationApi');
const dashBoardRoute=require('../apis/dashBoardApi/dashBoardApi')



//calling of internal routes
apiRoute.use('/blogs',blogsRoute);
apiRoute.use('/vaccination',vaccinationRoute);
apiRoute.use('/notes',notesRoute);
apiRoute.use('/nutrition',nutritionRoute);
apiRoute.use('/overallGrowth',overallGrowthRoute);
apiRoute.use('/login',loginRoute);
apiRoute.use('/signup',signupRoute);
apiRoute.use('/register',registrationRoute);
apiRoute.use('/dashBoard',dashBoardRoute);

apiRoute.get('/',(req,res)=>{
    res.json("Inside Apis add slash for more")
})

module.exports=apiRoute;