const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const config =require('./config')
const PORT=process.env.PORT || 3000;
const app=express()
app.use(bodyParser.json());
app.use(cors());
const knex = require('knex')(config.getDbDetails);
const apiRoute=require('./apis/index')



app.get('/',(req,res)=>{
	res.json("this is working Sakshi Done with Code")
})

app.use('/api',apiRoute);


app.listen(PORT,()=>{
    console.log("App is running on "+PORT)
    console.log("Environment "+process.env.NODE_ENV)
})