DROP DATABASE IF EXISTS reviews_service;
CREATE DATABASE reviews_service;

\c reviews_service;

CREATE TABLE "products" (
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY
);

CREATE TABLE "characteristics" (
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY,
  "product_id" integer,
  "characteristic" varchar(30)
);

CREATE TABLE "reviews" (
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY,
  "product_id" integer,
  "rating" integer CHECK ("rating" > 0 AND "rating" < 6),
  "date" bigint,
  "summary": varchar(255),
  "body" text,
  "recommend" boolean,
  "reported" boolean,
  "reviewer_name" varchar(30),
  "email" varchar(50),
  "response" text,
  "helpfulness" integer CHECK ("helpfulness" > 0)
);

CREATE TABLE "photos" (
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY,
  "review_id" integer,
  "url" varchar(500)
);

CREATE TABLE "characteristic_reviews" {
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY,
  "char_id" integer,
  "review_id" integer,
  "value" real
}

ALTER TABLE "characteristics" ADD CONSTRAINT "characteristics_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "reviews" ADD CONSTRAINT "reviws_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "photos" ADD CONSTRAINT "photos_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "reviews" ("id");
ALTER TABLE "characteristic_reviews" ADD CONSTRAINT "characteristic_reviews_char_id_fk" FOREIGN KEY ("char_id") REFERENCES "characteristics" ("id");
ALTER TABLE "characteristic_reviews" ADD CONSTRAINT "characteristic_reviews_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "reviews" ("id");