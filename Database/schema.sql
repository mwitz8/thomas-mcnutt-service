CREATE TABLE IF NOT EXISTS attractions (
  "id" SERIAL PRIMARY KEY,
  "name" character varying(250) NOT NULL,
  "averageRating" integer NOT NULL,
  "totalRatings" integer NOT NULL,
  "imageUrl" character varying(250) NOT NULL,
  "price" float NOT NULL,
  "description" character varying(250) NOT NULL,
  "distanceFrom" float NOT NULL,
  "basicDescription" character varying(250) NOT NULL
);
CREATE UNIQUE INDEX attractions_pkey ON attractions(id int4_ops);
COPY attractions("id", "name", "averageRating", "totalRatings", "imageUrl", "price", "description", "distanceFrom", "basicDescription")
FROM 'C:\Users\Public\SDC\data\attractions.csv'
DELIMITER '|';

CREATE TABLE IF NOT EXISTS locations (
  "id" SERIAL PRIMARY KEY,
  -- "Name" character varying(250) NOT NULL,
  "latitude" float NOT NULL,
  "longitude" float NOT NULL,
  "averageRating" float NOT NULL,
  "totalRatings" integer NOT NULL,
  "street" character varying(250) NOT NULL,
  "city" character varying(250) NOT NULL,
  "country" character varying(250) NOT NULL,
  "zip" character varying(250) NOT NULL,
  "website" character varying(250) NOT NULL,
  "phoneNumber" character varying(250) NOT NULL,
  "email" character varying(250) NOT NULL
);
CREATE UNIQUE INDEX locations_pkey ON locations(id int4_ops);
COPY locations("id", "Name", "latitude", "longitude", "averageRating", "totalRatings", "street", "city", "country", "zip", "website", "phoneNumber", "email")
FROM 'C:\Users\Public\SDC\data\locations.csv'
DELIMITER '|';

CREATE TABLE IF NOT EXISTS locationReviews (
  "id" SERIAL PRIMARY KEY,
  "locationId" integer REFERENCES locations("id"),
  "review" character varying(5000) NOT NULL
);
CREATE UNIQUE INDEX locationReviews_pkey ON locationReviews(id int4_ops);
CREATE INDEX locations_fkey ON locationReviews(id int4_ops);
COPY locationReviews("id", "locationId", "review")
FROM 'C:\Users\Public\SDC\data\locationReviews.csv'
DELIMITER '|';

CREATE TABLE IF NOT EXISTS restaurants (
  "id" SERIAL PRIMARY KEY,
  "name" character varying(250) NOT NULL,
  "averageRating" float NOT NULL,
  "totalRatings" integer NOT NULL,
  "imageUrl" character varying(250) NOT NULL,
  "distanceFrom" float NOT NULL,
  "foodType" character varying(250) NOT NULL,
  "price" float NOT NULL
);
CREATE UNIQUE INDEX restaurants_pkey ON restaurants(id int4_ops);
COPY restaurants("id", "name", "averageRating", "totalRatings", "imageUrl", "distanceFrom", "foodType", "price")
FROM 'C:\Users\Public\SDC\data\restaurants.csv'
DELIMITER '|';