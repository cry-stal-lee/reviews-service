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
  reported boolean DEFAULT false,
  reviewer_name varchar(30),
  email varchar(50),
  response text,
  helpfulness integer DEFAULT 0
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
FROM '/docker-entrypoint-initdb.d/SDC Data/product.csv'
DELIMITER ','
CSV HEADER;

INSERT INTO products(id)
SELECT id
FROM tmp;

CREATE INDEX ON products(id);
SELECT SETVAL('products_id_seq', max(id)) FROM products;

DROP TABLE tmp;

COPY characteristics
FROM '/docker-entrypoint-initdb.d/SDC Data/characteristics.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON characteristics(id);
CREATE INDEX ON characteristics(product_id);
SELECT SETVAL('characteristics_id_seq', max(id)) FROM characteristics;

COPY reviews
FROM '/docker-entrypoint-initdb.d/SDC Data/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON reviews(id);
CREATE INDEX ON reviews(product_id);
SELECT SETVAL('reviews_id_seq', max(id)) FROM reviews;

COPY photos
FROM '/docker-entrypoint-initdb.d/SDC Data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON photos(id);
CREATE INDEX ON photos(review_id);
SELECT SETVAL('photos_id_seq', max(id)) FROM photos;

COPY characteristic_reviews
FROM '/docker-entrypoint-initdb.d/SDC Data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON characteristic_reviews(id);
CREATE INDEX ON characteristic_reviews(char_id);
CREATE INDEX ON characteristic_reviews(review_id);
SELECT SETVAL('characteristic_reviews_id_seq', max(id)) FROM characteristic_reviews;

ALTER TABLE reviews
ALTER COLUMN date TYPE timestamp USING to_timestamp(date / 1000);

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO atelier;