const db = require('./index.js');

const markAsHelpful = async(review_id) => {
  try {
    const res = await db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 where id=${review_id};`);
    console.log(`Successfully marked review ${review_id} as helpful!`);
  } catch (err) {
    console.log(err.stack);
  }
}

const reportReview = async(review_id) => {
  try {
    const res = await db.query(`UPDATE reviews SET reported=true WHERE id=${review_id};`);
    console.log(`Successfully reported review ${review_id}!`);
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = { markAsHelpful, reportReview };