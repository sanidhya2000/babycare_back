

const express = require ('express');
const dashBoardRoute = express.Router();
const config =require('../../config')
const knex = require('knex')(config.getDbDetails);
const path = require("path");


dashBoardRoute.get('/',(req,res)=>{
    res.json("DashBoardApis resides here")
})

dashBoardRoute.get('/getAvtaar/:id',(req,res)=>{
    
    let avtarName=`avtar${req.params.id}`;
    res.sendFile(path.join(__dirname, `../../assets/avtaars/${avtarName}.png`));

})

dashBoardRoute.get('/userInfo/:uuid',(req,res)=>{
    
    const uuid=req.params.uuid

 

    knex('user_detail').select('uuid','name').where('uuid','=',uuid).then(user=>{
       
        let userName=user[0].name;

        knex('baby_reg_details').select('baby_name','avtar_link').where('uuid','=',uuid).then(info=>{
            res.json({
                uuid:user[0].uuid,
                userName:userName,
                babyName:info[0].baby_name,
                avtarId:info[0].avtar_link
            }).status(200)
        })
        .catch(err=>{
            res.json("Unable to fetch").status(400)
            console.log(err)
        })
    })

    .catch(err=>{
        res.json("Unable to fetch").status(400)
        console.log(err)
    })

})


module.exports=dashBoardRoute