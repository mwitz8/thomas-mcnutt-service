const { Pool } = require('pg');

const client = new Pool({
  user: 'postgres',
  host: '18.222.40.18',
  database: 'SDC',
  port: 5432,
  password: 'mwitz8'
});

client.connect(() => {
  console.log('connected to database');
});

module.exports = client;

/*
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost/maps';

module.exports = {
  db: () => {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
    })
      .then(() => console.log('connected to mongoDB'))
      .catch((err) => console.log('Error connecting to mongoDB', err));
  },

  dbDisc: (done) => {
    mongoose.disconnect(done)
      .catch((err) => console.log('error disconnecting from mongoDB', err));
  },
};
*/