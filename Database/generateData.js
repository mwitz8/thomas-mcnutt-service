const faker = require('faker');
const fs = require('fs');

const attractionsFile = fs.createWriteStream('./Database/data/attractions.csv');
const locationsFile = fs.createWriteStream('./Database/data/locations.csv');
const locationReviewsFile = fs.createWriteStream('./Database/data/locationReviews.csv');
const restaurantsFile = fs.createWriteStream('./Database/data/restaurants.csv');

const randomizer = (num) => Math.floor(Math.random() * num);

var generateAttraction = function() {
  return `${faker.commerce.productName()},${randomizer(5)},${randomizer(1000)},${faker.image.image()},${faker.commerce.price()},${faker.commerce.productDescription()},${`0.${randomizer(9)}`},${faker.commerce.productDescription()}\n`;
}
var generateLocation = function() {
  return `${Math.floor(Math.random() * Math.floor(180)) - 90},${Math.floor(Math.random() * Math.floor(260)) - 180},${randomizer(5)},${randomizer(1000)},${faker.address.streetName()},${faker.address.city()},${faker.address.country()},${faker.address.zipCode()},${`www.${faker.internet.domainName()}.gov`},${faker.phone.phoneNumber()},${faker.internet.email()}`;
}
var generateLocationReview = function() {
  return `${randomizer(10000000)},${faker.lorem.paragraph()}`;
}
var generateRestaurant = function() {
  return `${faker.random.catch_phrase_adjective + faker.random.catch_phrase_noun()},${randomizer(5)},${randomizer(1000)},${faker.image.nightLife()},${`0.${randomizer(9)}`},${faker.random.catch_phrase_adjective()},${faker.commerce.price()}`;
}

var writeAttractions = function(entries) {
    var i = 0;
    var stream = () => {
      while (i < entries) {
        var attraction = generateAttraction();
        if (attractionsFile.write(attraction) === false) {
          break;
        } else {
          i++;
        }
      }
      attractionsFile.once('drain', stream);
    }
    stream();
}
var writeLocations = function(entries) {
  var i = 0;
  var stream = () => {
    while (i < entries) {
      var location = generateLocation();
      if (locationsFile.write(location) === false) {
        break;
      } else {
        i++;
      }
    }
    locationsFile.once('drain', stream);
  }
  stream();
}
var writeLocationReviews = function(entries) {
  var i = 0;
  var stream = () => {
    while (i < entries) {
      var locationReview = generateLocationReview();
      if (locationReviewsFile.write(locationReview) === false) {
        break;
      } else {
        i++;
      }
    }
    locationReviewsFile.once('drain', stream);
  }
  stream();
}
var writeRestaurants = function(entries) {
  var i = 0;
  var stream = () => {
    while (i < entries) {
      var restaurant = generateLocationReview();
      if (restaurantsFile.write(restaurant) === false) {
        break;
      } else {
        i++;
      }
    }
    restaurantsFile.once('drain', stream);
  }
  stream();
}

writeAttractions(10000000);
writeLocations(10000000);
writeLocationReviews(10000000);
writeRestaurants(10000000);