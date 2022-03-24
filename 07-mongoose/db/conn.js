const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost/mongoose');
    console.log('Conectado no MongoDB');
}

main().catch(e => console.log(e));

module.exports = mongoose;