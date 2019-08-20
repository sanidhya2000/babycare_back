const express = require ('express');
const blogsRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);


// blogsRoute.get('/',(req,res)=>{
//     res.json("Blogs Api Needs to be Written here")
// })


blogsRoute.post('/', function(req, res) {
    console.log(req.body)

    knex.transaction(trx=>{
        trx.insert(req.body).returning('*').into('blogs').then(function(data) {
            res.send(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    //INSERT INTO tablename(column1, column2) VALUES(column1_value, column2_value)
})


blogsRoute.get('/', function(req, res) {
    knex.select().from('blogs').then(function(data) {
        res.send(data);
    });
    
});

module.exports = blogsRoute;