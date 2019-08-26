const express = require ('express');
const overallGrowthRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);


overallGrowthRoute.get('/',(req,res)=>{
    res.json("overall Growth Api Needs to be Written here")
})




overallGrowthRoute.post('/submitdata', function(req, res) {
    const {uuid,currDate,height,weight}=req.body;


    knex.transaction(trx=>{

        trx.update({
            'height':height,
            'weight':weight


        }).andWhere('uuid','=',uuid).andWhere('date','=',currDate).into('overall_growth_user').returning('date').then(date=>{
           //console.log(date)
            let nextDate=new Date(date[0]);
            console.log(nextDate)
            nextDate.setDate(nextDate.getDate()+15);
            let finalNextDate=nextDate.getFullYear()+'-'+(nextDate.getMonth()+1)+'-'+nextDate.getDate();
            return trx.insert({
                'uuid':uuid,
                'height':0,
                'weight':0,
                'date':finalNextDate
            }).into('overall_growth_user').then(data=>{res.json(data)})
            .catch(err=>console.log(err))
        })
 
        
        .then(trx.commit)
        .catch(trx.rollback)
    })
    //INSERT INTO tablename(column1, column2) VALUES(column1_value, column2_value)
})
 


overallGrowthRoute.get('/:id', function(req, res) {

<<<<<<< HEAD
    console.log(req.params.id)
=======
>>>>>>> 28ed03a72b769de6cd96b40f44e9ff34316063dd
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
            console.log(count);
            console.log(usersDetailes[0].uuid);
            console.log(idealDetailes[0].duration);
            const dataheight = [];
            const dataweight = [];
            
            for(let x of Object.keys(usersDetailes))
            {
                console.log("yes") 

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
            console.log(dataheight);
            console.log(dataweight);
        });

    });
    
    
})

module.exports = overallGrowthRoute;