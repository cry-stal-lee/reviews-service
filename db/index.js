const { Pool } = require('pg');
const config = require('../config.js');

const db = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

db.connect()
.then(() => console.log(`Connected to database ${config.database}`))
.catch((err) => console.log(`Error connecting to db: ${err}`));

const markAsHelpful = (review_id) => {
  const query = {
    text: `UPDATE reviews SET helpfulness = helpfulness + 1 where id=${review_id};`
  }
}

module.exports = db;