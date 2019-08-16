//this is use for login and after that it redirect to home page;

const express = require ('express');
const loginRoute = express.Router();
const uuid=require('uuid/v4');
const config =require('../../config')
const knex = require('knex')(config.getDbDetails);

loginRoute.get('/',(req,res)=>{

    res.json("Login Api Needs to be Written here")
})


loginRoute.post('/exists',(req,res)=>{

        const {email,name,password} =req.body;
        if(!email || !name){
            return	res.status(400).json('incorrect form Submission');
           }
        
          
            
            knex.where({email:email}).select('uuid').from('users').then(user=>{
                
                if(user.length){
                    res.json({
                        "exists":true,
                        "uuid":user[0].uuid
                    }).status(200)
                }
                else{

                    knex.transaction(trx=>{
                    trx.insert({
                        uuid:uuid(),
                        email:email,
                        password:password,
                        mobile_number:null
                    }).into('users').returning('uuid')
                    .then(uuid=>{
                        return trx.insert({
                            uuid:uuid[0],
                            name:name
                        }).into('user_detail').returning('uuid')

                        .then(uuid=>{
                            response ={"exists":false,
                            "uuid":uuid[0]
                        }
                            res.json(response).status(200)
                        })
                        
                        
                           
                        })

                        .then(trx.commit)
		                .catch(trx.rollback)

                    })
                    .catch(err=>{res.status(404).json('unable to register')}) 
                }
            })
        .catch(err=>{res.status(404).json('unable to register')
        console.log(err)})
})


module.exports = loginRoute;