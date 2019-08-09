const knex = require('knex')({
    client: 'pg',
    connection:{
        host: 'localhost',
        user : 'postgres',
        password : '123abhaysahu321',
        database: 'todo_db'
    }
});


module.exports = knex;

