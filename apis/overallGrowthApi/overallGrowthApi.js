const express = require ('express');
const overallGrowthRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);


overallGrowthRoute.get('/',(req,res)=>{
    res.json("overall Growth Api Needs to be Written here")
})




overallGrowthRoute.post('/submitData', function(req, res) {
    const {uuid,currDate,height,weight}=req.body;
    //TODO:delete from overall_growth_user where uuid='2f5f2ca5-4528-47db-8b03-9d90f8058d20' and date='2019-07-26';


    knex.transaction(trx=>{

        let nextDate=new Date(currDate);
        nextDate.setDate(nextDate.getDate()+15);
        let finalNextDate=nextDate.getFullYear()+'-'+(nextDate.getMonth()+1)+'-'+nextDate.getDate();
        console.log(finalNextDate);

        trx.raw(`delete from overall_growth_user where uuid='${uuid}' and date='${finalNextDate}';`)
        .then(data=>{
            console.log(data)


        return trx.update({
            'height':height,
            'weight':weight


        }).andWhere('uuid','=',uuid).andWhere('date','=',currDate).into('overall_growth_user').returning('date').then(date=>{

            
            return trx.insert({
                'uuid':uuid,
                'height':0,
                'weight':0,
                'date':finalNextDate
                //TODO: CHNAGE THE RES TO A PERFECT DATA:------ task is complete
                
            }).into('overall_growth_user').returning('uuid').then(data=>{res.json({
                status:"done",
                uuid:data[0]//This is how you must send response never pass res directly.
            })})
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err));
        
    }).then(trx.commit)
    .catch(err=>{
        console.log(err)
        trx.rollback})
})
});
 


overallGrowthRoute.get('/:id', function(req, res) {

    knex.raw(`select * from overall_growth_user where date<=now() and uuid='${req.params.id}';`).then(data=>{
        res.json(data.rows)
    })
});

const min=(a,b)=>{
    return a>b;
}


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

            console.log(usersDetailes)
            
            let iteartions=min(idealDetailes.length,usersDetailes.length);
            

            const dataheight = [];
            const dataweight = [];
            
            for(let x=0;x<iteartions;x++)
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
        });
    }); 
});

module.exports = overallGrowthRoute;
