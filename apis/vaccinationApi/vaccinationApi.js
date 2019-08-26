const express = require ('express');
const vaccinationRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);

vaccinationRoute.get('/',(req,res)=>{
    res.json("Vaccination Api Needs to be Written here")
})


//TODO:
vaccinationRoute.post('/', function(req, res) {
    const {uuid, vaccination_id, expected_date, user_response,birthDate}=req.body;
  
    let toCheck;
    let exist = 0;
    
    
    knex.select().from('baby_reg_details').where('uuid','=', uuid).then(function(data){
        
      
        if(data.length)
        {
            exist = 0;
            console.log("yes")
        }
        else
        {
            console.log("no")
            exist = 1;
            let idealDetailes = {};
        
            let counter=0;
            knex.select().from('vaccinations_ideal').orderBy('vaccination_id').then(function(data) {
                idealDetailes = data;

                idealDetailes.map((record)=>{
                    let noOfDays=record.duration;
                    let nextDate=new Date(birthDate);
                    nextDate.setDate(nextDate.getDate()+noOfDays);
                    let finalDate=nextDate.getFullYear()+'-'+(nextDate.getMonth()+1)+'-'+nextDate.getDate();
                    knex.insert({
                        uuid:uuid,
                        vaccination_id:record.vaccination_id,
                        expected_date:finalDate
                    }).into('vaccinations_user').returning('vaccination_id').then(id=>{
                        counter=1;
                        console.log(counter)
                    })
                    
                    .catch(err=>{
                        console.log(err);
                        counter=0;
                        console.log("err")
                        console.log(counter)
                    })
                })
            
                
            })
        
            .then(resp=>{

            
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })

    .then(resp=>{

        if(exist)
        {
            res.json("done");
        }
        else
        {
            res.json("already exists");
        }
    })

})



vaccinationRoute.post('/update_vaccination_detailes', function(req, res){

    const {uuid, vaccination_id, expected_date, user_response,birthDate}=req.body;
  
    
    knex.transaction(trx=>{
        trx.update({
            'user_response': 't'
        }).andWhere('uuid', '=', uuid).andWhere('vaccination_id', '=', vaccination_id).into('vaccinations_user').returning('*').then(data=>{
            res.send(data);
        })

        .then(trx.commit)
    .catch(err=>{
        console.log(err)
        trx.rollback
    })
    })
    
})


module.exports = vaccinationRoute;