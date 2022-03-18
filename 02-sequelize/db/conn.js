const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesquelize', 't3tecnologia', 'Agoravai@18mavi11', {
    host: 'localhost',
    dialect: 'mysql'
});

/* try{
    sequelize.authenticate();
    console.log('Conectado com sucesso');
} catch(err){
    console.log('Erro ao conectar com o banco de dados');
} */
module.exports = sequelize;