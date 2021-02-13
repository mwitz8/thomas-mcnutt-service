const mongoose = require('mongoose');
const client = require('./index.js');
const faker = require('faker');
// const { db } = require('./index.js');

// db();

mongoose.Promise = global.Promise;

const locationSchema = new mongoose.Schema({
  Name: String,
  coords: {
    lat: { type: Number },
    long: { type: Number },
  },
  ratings: {
    avg: { type: Number },
    total: { type: Number },
  },
  address: {
    street: String,
    city: String,
    country: String,
    zip: String,
  },
  reviews: [String],
  website: String,
  phoneNum: String,
  email: String,
  _id: {
    type: String,
    default() {
      return new mongoose.Types.ObjectId();
    },
  },
});

const location = mongoose.model('location', locationSchema);

module.exports = {

  Locations: location,

  find: (req, res) => {
    client.query(`
      SELECT *
      FROM locations
      WHERE id = 1
    `, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        var data = result.rows[0];
        data.Name = faker.address.city();
        data.ratings = {
          avg: data.averageRating,
          total: data.totalRatings,
        };
        data.coords = {
          lat: data.latitude,
          long: data.longitude
        }
        data.address = {
          street: data.street,
          city: data.city,
          country: data.country,
          zip: data.zip
        }
        delete data.averageRating;
        delete data.totalRatings;
        delete data.latitude;
        delete data.longitude;
        delete data.street;
        delete data.city;
        delete data.country;
        delete data.zip;
        // client.query(`
        // SELECT *
        // FROM locationReviews
        // LIMIT 3`, (err, result2) => {
        //   if (err) {
        //     res.status(400).send(err);
        //   } else {
        //     var reviewsData = result2.rows;
            //  data.reviews = [reviewsData[0].review, reviewsData[1].review, reviewsData[2].review];
            data.reviews = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu turpis egestas pretium aenean pharetra. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Magna sit amet purus gravida quis blandit turpis cursus in. Vitae tortor condimentum lacinia quis vel eros. Est pellentesque elit ullamcorper dignissim cras. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Amet consectetur adipiscing elit ut aliquam purus sit amet. Vel risus commodo viverra maecenas accumsan. Amet consectetur adipiscing elit pellentesque. Dolor purus non enim praesent elementum facilisis leo. Tellus elementum sagittis vitae et leo.', 'Blandit turpis cursus in hac habitasse. Massa tempor nec feugiat nisl pretium fusce id velit. Lorem mollis aliquam ut porttitor leo a. Aliquam faucibus purus in massa tempor nec. Orci dapibus ultrices in iaculis nunc sed. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Ac turpis egestas integer eget aliquet nibh praesent. Aliquam nulla facilisi cras fermentum odio. Sed velit dignissim sodales ut eu sem integer vitae justo. Auctor urna nunc id cursus. In vitae turpis massa sed. Risus nullam eget felis eget. Condimentum mattis pellentesque id nibh tortor id. Sociis natoque penatibus et magnis.', 'Tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Amet facilisis magna etiam tempor orci eu. Porttitor lacus luctus accumsan tortor posuere. Magna sit amet purus gravida. Mi proin sed libero enim sed faucibus turpis in eu. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Ut sem nulla pharetra diam. Rhoncus dolor purus non enim praesent elementum. Ut faucibus pulvinar elementum integer enim neque. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Amet volutpat consequat mauris nunc congue nisi. Lobortis feugiat vivamus at augue eget arcu dictum varius. Integer vitae justo eget magna fermentum. Eget aliquet nibh praesent tristique. Non blandit massa enim nec dui nunc mattis. Cras adipiscing enim eu turpis egestas. Morbi leo urna molestie at elementum. Lorem ipsum dolor sit amet consectetur adipiscing elit. Augue lacus viverra vitae congue. Libero justo laoreet sit amet cursus sit.']; //added these reviews because accessing the table in the database was hanging
        console.log(data);
            res.status(200).send(data);
          // }
        }//)
      //}
    });
    /*
    location.findOne({}, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
    */
  },

  create: (req, res) => {
    const obj = {
      name: req.body.name,
      coords: req.body.coords,
      ratings: req.body.ratings,
      imageUrl: req.body.imageUrl,
      address: req.body.address,
      reviews: req.body.reviews,
      website: req.body.website,
      phoneNum: req.body.phoneNum,
      email: req.body.email,
    };
    location.create(obj, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(201).send(result);
    });
  },

  update: (req, res) => {
    const id = { _id: req.params.id };
    const obj = {
      name: req.body.name,
      coords: req.body.coords,
      ratings: req.body.ratings,
      imageUrl: req.body.imageUrl,
      address: req.body.address,
      reviews: req.body.reviews,
      website: req.body.website,
      phoneNum: req.body.phoneNum,
      email: req.body.email,
    };
    location.updateOne(id, obj, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
  },

  delete: (req, res) => {
    const id = { _id: req.params.id };
    location.deleteOne({ _id: id }, (err, result) => {
      if (err) { res.status(400).send(err); } else res.status(200).send(result);
    });
  },
};
