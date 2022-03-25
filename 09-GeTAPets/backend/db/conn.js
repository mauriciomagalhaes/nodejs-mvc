const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost/getapet')
    console.log('Conectou ao MongoDB');
}

main().catch(error => console.log(error));

module.exports = mongoose;