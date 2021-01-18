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
      .then(() => console.log('disconnected from mongoDB'))
      .catch((err) => console.log('error disconnecting from mongoDB', err));
  },
};
