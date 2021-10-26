# ⭐ E-Commerce Ratings & Reviews Service
For this project, my team was tasked with replacing the API for an e-commerce clothing retailer using a scalable microservice architecture in order to handle increased web traffic. Each teammate focused on a different microservice. I worked on the backend for the Ratings & Reviews service, the frontend of which is shown below.

<img width="800" alt="Ratings & Reviews Frontend" src="https://user-images.githubusercontent.com/52181740/138846685-83ad9043-8fd1-4a75-b4e9-ccb6718b1a99.png">


## 🏆 Achievements and Optimizations
- Seeded a PostgreSQL database with over 20 million records
- Optimized raw SQL query execution times to average < 1ms per query using indexes, joins and PostgreSQL JSON functions
- Improved throughput from around 200 requests per second to over 5000 requests per second with <20 ms latency and 0% error rate on average by horizontal scaling between two EC2 server instances with NGINX
- Deployed database and each server using Docker containers for version control
<img width="800" alt="K6 Local Stress Test" src="https://user-images.githubusercontent.com/52181740/138858426-4030c21d-fca7-4859-8108-62dc895d88bd.png">

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
