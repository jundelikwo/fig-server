const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(client => {
    console.log('Connected to Database')
  })
  .catch(error => console.error(error));

module.exports = {
        client
    } //module.exports.mongoose = mongoose
