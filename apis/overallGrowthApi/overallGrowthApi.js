const express = require ('express');
const overallGrowthRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);


overallGrowthRoute.get('/',(req,res)=>{
    res.json("overall Growth Api Needs to be Written here")
})




overallGrowthRoute.post('/submitData', function(req, res) {
    const {uuid,currDate,height,weight}=req.body;


    knex.transaction(trx=>{

        trx.update({
            'height':height,
            'weight':weight


        }).andWhere('uuid','=',uuid).andWhere('date','=',currDate).into('overall_growth_user').returning('date').then(date=>{

            let nextDate=new Date(date[0]);
            console.log(nextDate)
            nextDate.setDate(nextDate.getDate()+15);
            let finalNextDate=nextDate.getFullYear()+'-'+(nextDate.getMonth()+1)+'-'+nextDate.getDate();
            return trx.insert({
                'uuid':uuid,
                'height':0,
                'weight':0,
                'date':finalNextDate
                //TODO: CHNAGE THE RES TO A PERFECT DATA:------ task is complete
            }).into('overall_growth_user').returning('uuid').then(data=>{res.json(data)})
            .catch(err=>console.log(err))
        })
 
        
        .then(trx.commit)
        .catch(trx.rollback)
    });
});
 


overallGrowthRoute.get('/:id', function(req, res) {

    knex.raw(`select * from overall_growth_user where date<=now() and uuid='${req.params.id}';`).then(data=>{
        res.json(data.rows)
    })
});



overallGrowthRoute.get('/graph/:id', function(req, res){
    
    let idealDetailes = {};
    let usersDetailes = {};
    let count = {};
    knex.select().from('overall_growth_user').count('uuid').where('uuid','=', req.params.id).then(function(data) {
        count = data[0];
        
    })
    knex.select().from('overall_growth_ideal').then(function(data) {
        idealDetailes = data;
        
        knex.select().from('overall_growth_user').where('uuid','=', req.params.id).orderBy('date').then(function(data) {
            usersDetailes = data;
            
            const dataheight = [];
            const dataweight = [];
            
            for(let x of Object.keys(usersDetailes))
            {
                console.log(x) 

                dataheight.push({
                    "days": idealDetailes[x].duration,
                    "idealHeight": idealDetailes[x].height,
                    "userHeight": usersDetailes[x].height,
                }) 
                
                dataweight.push({
                    "days": idealDetailes[x].duration,
                    "idealWeight": idealDetailes[x].weight,
                    "userWeight": usersDetailes[x].weight

                })
            }
            // TODO is complete
            res.json({
                dataheight,
                dataweight
            })
        })

    });
    
    
})

module.exports = overallGrowthRoute;
