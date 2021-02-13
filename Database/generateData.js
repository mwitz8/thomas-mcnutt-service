const faker = require('faker');
const fs = require('fs');

const attractionsFile = fs.createWriteStream('/mnt/c/Users/public/SDC/data/attractions.csv');
const locationsFile = fs.createWriteStream('/mnt/c/Users/public/SDC/data/locations.csv');
const locationReviewsFile = fs.createWriteStream('/mnt/c/Users/public/SDC/data/locationReviews.csv');
const restaurantsFile = fs.createWriteStream('/mnt/c/Users/public/SDC/data/restaurants.csv');

const randomizer = (num) => Math.floor(Math.random() * num);

var attractionId = 0;
var generateAttraction = function() {
  attractionId++;
  return `${attractionId}|${faker.commerce.productName()}|${randomizer(5)}|${randomizer(1000)}|${faker.image.image()}|${faker.commerce.price()}|${faker.commerce.productDescription()}|${`0.${randomizer(9)}`}|${faker.commerce.productDescription()}\n`;
}
var locationId = 0;
var generateLocation = function() {
  locationId++;
  return `${locationId}|${faker.address.city()}|${faker.address.city()}|${Math.floor(Math.random() * Math.floor(180)) - 90}|${Math.floor(Math.random() * Math.floor(260)) - 180}|${randomizer(5)}|${randomizer(1000)}|${faker.address.streetName()}|${faker.address.city()}|${faker.address.country()}|${faker.address.zipCode()}|${`www.${faker.internet.domainName()}.gov`}|${faker.phone.phoneNumber()}|${faker.internet.email()}\n`;
}
var locationReviewId = 0;
var generateLocationReview = function() {
  locationReviewId++;
  return `${locationReviewId}|${1 + randomizer(9999999)}|${faker.lorem.paragraph()}\n`;
}
var restaurantId = 0;
var generateRestaurant = function() {
  restaurantId++;
  return `${restaurantId}|${faker.company.catchPhraseAdjective() + ' ' + faker.company.catchPhraseNoun()}|${randomizer(5)}|${randomizer(1000)}|${faker.image.nightlife()}|${`0.${randomizer(9)}`}|${faker.company.catchPhraseAdjective()}|${faker.commerce.price()}\n`;
}

var writeRestaurants = function(entries) {
  var i = 0;
  var stream = () => {
    while (i < entries) {
      var restaurant = generateRestaurant();
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
var writeAttractions = function(entries) {
  var i = 1;
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

writeRestaurants(10000000);
writeAttractions(10000000);
writeLocations(10000000);
writeLocationReviews(10000000);