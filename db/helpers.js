const db = require('./index.js');

const markAsHelpful = async(review_id) => {
  try {
    const res = await db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 where id = $1;`, [review_id]);
    console.log(`Successfully marked review ${review_id} as helpful!`);
  } catch (err) {
    console.log(err.stack);
  }
}

const reportReview = async(review_id) => {
  try {
    const res = await db.query(`UPDATE reviews SET reported=true WHERE id= $1`, [review_id]);
    console.log(`Successfully reported review ${review_id}!`);
  } catch (err) {
    console.log(err.stack);
  }
}

const getReviews = async(product_id, sort, count, page) => {
  console.log(sort);
  const query = {
    text: `SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date AS date, reviews.reviewer_name, reviews.helpfulness, json_agg(json_build_object('id', photos.id, 'url', photos.url)) AS photos
    FROM reviews LEFT JOIN photos
    ON photos.review_id = reviews.id
    WHERE reviews.product_id = $1 AND reviews.reported = false
    GROUP BY reviews.id
    ORDER BY $2 DESC
    LIMIT $3
    OFFSET $4;`,
    values: [product_id, sort, count, (page - 1) * count]
  }
  try {
    const res = await db.query(query);
    return res.rows;
  } catch (err) {
    return err.stack;
  }
}

module.exports = { markAsHelpful, reportReview, getReviews};