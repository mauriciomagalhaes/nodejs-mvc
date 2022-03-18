const { Sequelize } = require('sequelize');
//const mysql = require('mysql');


// Sequelize
const sequelize = new Sequelize('nodesquelize', 't3tecnologia', 'Agoravai@18mavi11', {
    host: 'localhost',
    dialect: 'mysql'
});
/* const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 't3tecnologia',
    password: 'Agoravai@18mavi11',
    database: 'books'
})
 */
module.exports = sequelize;