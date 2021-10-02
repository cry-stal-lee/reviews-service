DROP DATABASE IF EXISTS reviews_service;
CREATE DATABASE reviews_service;

\c reviews_service;

CREATE TEMP TABLE tmp (
  id bigserial NOT NULL UNIQUE PRIMARY KEY,
  name varchar(30),
  slogan varchar(255),
  description text,
  category varchar(30),
  default_price real
);

CREATE TABLE products (
  id bigserial NOT NULL UNIQUE PRIMARY KEY
);

GRANT ALL ON products TO atelier;

CREATE TABLE characteristics (
  id bigserial NOT NULL UNIQUE PRIMARY KEY,
  product_id integer,
  characteristic varchar(30)
);

GRANT ALL ON characteristics TO atelier;

CREATE TABLE reviews (
  id bigserial NOT NULL UNIQUE PRIMARY KEY,
  product_id integer,
  rating integer CHECK (rating > 0 AND rating < 6),
  date bigint,
  summary varchar(255),
  body text,
  recommend boolean,
  reported boolean,
  reviewer_name varchar(30),
  email varchar(50),
  response text,
  helpfulness integer CHECK (helpfulness >= 0)
);

GRANT ALL ON reviews TO atelier;

CREATE TABLE photos (
  id bigserial NOT NULL UNIQUE PRIMARY KEY,
  review_id integer,
  url varchar(500)
);

GRANT ALL ON photos TO atelier;

CREATE TABLE characteristic_reviews (
  id bigserial NOT NULL UNIQUE PRIMARY KEY,
  char_id integer,
  review_id integer,
  value real
);

GRANT ALL ON characteristic_reviews TO atelier;

ALTER TABLE characteristics ADD CONSTRAINT characteristics_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE reviews ADD CONSTRAINT reviws_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE photos ADD CONSTRAINT photos_review_id_fk FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristic_reviews ADD CONSTRAINT characteristic_reviews_char_id_fk FOREIGN KEY (char_id) REFERENCES characteristics (id);
ALTER TABLE characteristic_reviews ADD CONSTRAINT characteristic_reviews_review_id_fk FOREIGN KEY (review_id) REFERENCES reviews (id);

COPY tmp
FROM '/Users/crystallee/Desktop/SDC Data/product.csv'
DELIMITER ','
CSV HEADER;

INSERT INTO products (id)
SELECT id
FROM tmp;

DROP TABLE tmp;

COPY characteristics
FROM '/Users/crystallee/Desktop/SDC Data/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/Users/crystallee/Desktop/SDC Data/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY photos
FROM '/Users/crystallee/Desktop/SDC Data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews
FROM '/Users/crystallee/Desktop/SDC Data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE reviews
ALTER COLUMN date TYPE timestamp USING to_timestamp(date / 1000);