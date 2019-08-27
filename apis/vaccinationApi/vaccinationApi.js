
const express = require ('express');
const vaccinationRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);

vaccinationRoute.get('/',(req,res)=>{
    res.json("Vaccination Api Needs to be Written here")
})




vaccinationRoute.get('/:id', function(req, res) {
    //TODO:::VACIINATION NAME Using Raw JOIN 
    // select * from vaccinations_user vu,vaccinations_ideal vi where vu.vaccination_id=vi.vaccination_id and vu.uuid='2f5f2ca5-4528-47db-8b03-9d90f8058d20';
   


    knex.raw(`select * from vaccinations_user vu,vaccinations_ideal vi where vu.vaccination_id=vi.vaccination_id and vu.uuid='${req.params.id}';`).then(data=>{
        res.json(data.rows)
    })
   

});






vaccinationRoute.post('/', function(req, res) {
    const {uuid, vaccination_id, expected_date, user_response,birthDate}=req.body;
  
    let exist = 0;
    
    
    knex.select().from('vaccinations_user').where('uuid','=', uuid).then(function(data){
        
      
        if(data.length)
        {
            exist = 0;
        }
        else
        {
            exist = 1;
            let idealDetailes = {};
        
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
                    }).into('vaccinations_user').returning('uuid').then(function(data) {
                        status = "done"
                    })
                })        
            })
        }
    })

    .then(resp=>{
//TODO:DATA
        if(exist)
        {
            res.json({
                "id": uuid,
                "status": "done"
            });
        }
        else
        {
            res.json({
                "id": uuid,
                "status": "already exists"
            });
        }
    })

})






vaccinationRoute.post('/update_vaccination_detailes', function(req, res){

    const { uuid, vaccination_id }=req.body;
  
    
    knex.transaction(trx=>{
        trx.update({
            'user_response': 't'
        }).andWhere('uuid', '=', uuid).andWhere('vaccination_id', '=', vaccination_id).into('vaccinations_user').returning('*').then(data=>{
            res.send(data[0]);
        })

        .then(trx.commit)
    .catch(err=>{
        console.log(err)
        trx.rollback
    })
    })
    
})



module.exports = vaccinationRoute;
