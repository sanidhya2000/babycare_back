//this is use for login and after that it redirect to home page;

const express = require ('express');
const registrationRoute = express.Router();
const config =require('../../config')
const knex = require('knex')(config.getDbDetails);

registrationRoute.get('/',(req,res)=>{
    res.json("Registrations Api Needs to be Written here")
})


registrationRoute.post('/',(req,res)=>{

    const {uuid,babyName,fathersName,mothersName,dateOfBirth,gender,mobileNumber,city,avtarLink} =req.body

    knex('users')
    .where('uuid','=',uuid)
    .update({
        mobile_number:mobileNumber
    })
    .returning('uuid')
    .then(uuid=>{
        knex('user_detail')
        .where('uuid','=',uuid[0])
        .update({
            city:city
        }).returning('uuid')
        .then(uuid=>{

            knex('baby_reg_details').select('*').where('uuid','=',uuid[0]).then(user=>{
                if(user.length){
                    knex.transaction(trx=>{
                        trx.update({
                            baby_name:babyName,
                            fathers_name:fathersName,
                            mothers_name:mothersName,
                            date_of_birth:dateOfBirth,
                            gender:gender,
                            avtar_link:avtarLink
                        }).where('uuid','=',uuid[0])
                        .into('baby_reg_details')
                        .returning('uuid')
                        .then(uuid=>{
                            res.json({'status':'done','uuid':uuid[0]}).status(200);
                        })
                        .then(trx.commit)
		            .catch(trx.rollback)
                    
                    })
                    
                }
                else{
                    knex.transaction(trx=>{
                        trx.insert({
                            uuid:uuid[0],
                            baby_name:babyName,
                            fathers_name:fathersName,
                            mothers_name:mothersName,
                            date_of_birth:dateOfBirth,
                            gender:gender,
                            avtar_link:avtarLink
                        })
                        .into('baby_reg_details')
                        .returning('uuid')
                        .then(uuid=>{
                            res.json({'status':'done','uuid':uuid[0]}).status(200);
                        })
                        .then(trx.commit)
		                .catch(trx.rollback)
                    })

                    
                    
                }
            })
            .catch(err=>{
                res.json('error').status(400)
                console.log(err)
            })

        })
        .catch(err=>{
            res.json('error').status(400)
            console.log(err)
        })
    
    })
    .catch(err=>{
        res.json('error').status(400)
        console.log(err)
    })


})


module.exports = registrationRoute;