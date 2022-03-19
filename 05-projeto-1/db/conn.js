const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 't3tecnologia', 'Agoravai@18mavi11', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate();
    console.log('Conexão com o banco de dados foi estabelecida com sucesso!');
}catch(err){
    console.log(`Não foi possivel conectar ao banco de dados: ${err}`)
}

exports.default = sequelize;
