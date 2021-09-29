DROP DATABASE IF EXISTS reviews_service;
CREATE DATABASE reviews_service;

\c reviews_service;

CREATE TABLE "products" (
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY
);

CREATE TABLE "characteristics" (
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY,
  "characteristic" text,
  "value" real,
  "product_id" integer
);

CREATE TABLE "reviews" (
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY,
  "rating" integer CHECK ("rating" > 0 AND "rating" < 6),
  "recommend" boolean,
  "response" text,
  "body" text,
  "date" bigint,
  "reviewer_name" text,
  "helpfulness" integer CHECK ("helpfulness" > 0),
  "email" text,
  "reported" boolean,
  "product_id" integer
);

CREATE TABLE "photos" (
  "id" bigserial NOT NULL UNIQUE PRIMARY KEY,
  "url" text,
  "review_id" integer
);

ALTER TABLE "characteristics" ADD CONSTRAINT "charfk" FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "reviews" ADD CONSTRAINT "revfk" FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "photos" ADD CONSTRAINT "photfk" FOREIGN KEY ("review_id") REFERENCES "reviews" ("id");