const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/testemongodb';

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error(error);
    }
}
run();

module.exports = client;