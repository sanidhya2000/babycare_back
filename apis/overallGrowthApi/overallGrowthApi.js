const express = require ('express');
const overallGrowthRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);


overallGrowthRoute.get('/',(req,res)=>{
    res.json("overall Growth Api Needs to be Written here")
})


overallGrowthRoute.post('/', function(req, res) {
    console.log(req.body)

    knex.transaction(trx=>{
        trx.insert(req.body).returning('*').into('overall_growth_user').then(function(data) {
            res.send(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    //INSERT INTO tablename(column1, column2) VALUES(column1_value, column2_value)
})



overallGrowthRoute.get('/:id', function(req, res) {
    knex.select().from('overall_growth_user').where('uuid','=', req.params.id).then(function(data) {
        res.send(data);
    });
});


module.exports = overallGrowthRoute;