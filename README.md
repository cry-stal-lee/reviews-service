# ⭐ E-Commerce Ratings & Reviews Service
![Loader 5K Test](https://user-images.githubusercontent.com/52181740/138920114-795ecffb-e99b-42e1-8898-0b35ccd39b4c.gif)

For *PROJECT ATELIER*, my team was tasked with replacing the API for an e-commerce clothing retailer using a scalable microservice architecture in order to handle increased web traffic. Each teammate focused on a different microservice. I worked on the backend for the Ratings & Reviews service.

## 🏆 Achievements and Optimizations
- Seeded a PostgreSQL database with over 20 million records
- Optimized raw SQL query execution times to average < 1ms per query using indexes, joins and PostgreSQL JSON functions
- Improved throughput from around 200 requests per second to over 5000 GET requests per second with <20 ms latency and 0% error rate on average by horizontal scaling between two EC2 server instances with NGINX
- Deployed database and each server using Docker containers for version control

## 💻 Installation
- NPM
- Node
- PostgreSQL

## 👤 Usage
- Install dependencies using [NPM](https://www.npmjs.com/)
```
npm install
```
- Start server
```
$ npm start
```
- Change the connection string in the database file to refer to your Postgres database
- Run the ETL code to seed your database

## 🛠️ Technologies
- Node
- Express
- PostgreSQL
- Docker
- Loader.io
- K6
- New Relic
- NGINX
