# ⭐ E-Commerce Ratings & Reviews Service
For this project, my team was tasked with replacing the API for an e-commerce clothing retailer in order to handle increased web traffic. Each teammate focused on a different microservice. I worked on the Ratings & Reviews service.

## 🏆 Achievements and Optimizations
- Seeded a PostgreSQL database with over 10 million records
- Optimized raw SQL query execution times to average < 1ms per query using hash indexes, joins and PostgreSQL JSON functions
- Improved throughput from around 200 requests per second to 2000 requests per second with low latency and < 1% error rate by horizontally scaling with multiple AWS servers and a load balancer

## 💻 Installation
- NPM
- Node
- PostgreSQL

## 👤 Usage
```
# install dependencies
npm install

# start server
npm start

# seed data
change the connection string in the database file to refer to your Postgres database and run the ETL code to seed your database
```

## 🛠️ Tech Stack
- Node
- Express
- PostgreSQL
- Docker
- Loader.io
- K6
- New Relic
- Nginx
