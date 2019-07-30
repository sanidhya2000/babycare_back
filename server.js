const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const PORT=process.env.port || 3000;
const app=express()
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.json("this is working")
})


app.listen(PORT,()=>{
    console.log("App is running on "+PORT)
})