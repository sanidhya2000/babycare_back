const express = require ('express');
const notesRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);



notesRoute.get('/',(req,res)=>{
    res.json("Notes Api Needs to be Written here")
})


notesRoute.post('/', function(req, res) {
    console.log(req.body)

    knex.transaction(trx=>{
        trx.insert(req.body).returning('*').into('notes').then(function(data) {
            res.send(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

    //INSERT INTO tablename(column1, column2) VALUES(column1_value, column2_value)
})



notesRoute.get('/:id', function(req, res) {
    knex.select().from('notes').where('uuid','=', req.params.id).then(function(data) {
        res.send(data);
    });
});


module.exports = notesRoute;