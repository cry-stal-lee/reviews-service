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
  const query = {
    text: `SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date AS date, reviews.reviewer_name, reviews.helpfulness, json_agg(json_build_object('id', photos.id, 'url', photos.url)) AS photos
    FROM reviews LEFT JOIN photos
    ON photos.review_id = reviews.id
    WHERE reviews.product_id = $1 AND reviews.reported = false
    GROUP BY reviews.id
    ORDER BY ${sort} DESC
    LIMIT $2
    OFFSET $3;`,
    values: [product_id, count, (page - 1) * count]
  }
  try {
    const res = await db.query(query);
    return res.rows;
  } catch (err) {
    return err.stack;
  }
}

const getMeta = async(product_id) => {
  const query = {
    text: `SELECT * FROM
    (SELECT json_build_object(0, COUNT(recommend)) AS recommended
    FROM reviews
    WHERE product_id=$1
    AND recommend=true) AS recommended,
    (SELECT json_strip_nulls(json_build_object(
      0, SUM(CASE WHEN rating=0 THEN 1
                  ELSE null
             END),
      1, SUM(CASE WHEN rating=1 THEN 1
                  ELSE null
             END),
      2, SUM(CASE WHEN rating=2 THEN 1
                  ELSE null
             END),
      3, SUM(CASE WHEN rating=3 THEN 1
                  ELSE null
             END),
      4, SUM(CASE WHEN rating=4 THEN 1
                  ELSE null
             END),
      5, SUM(CASE WHEN rating=5 THEN 1
                  ELSE null
             END))) as ratings
    FROM reviews
    WHERE product_id=$1
    ) AS ratings,
    (SELECT json_object_agg(inner_characteristics.characteristic, characteristics_list) AS characteristics
     FROM
         (SELECT
          characteristics.characteristic, json_build_object('value', AVG(characteristic_reviews.value), 'id', characteristics.id)
          AS characteristics_list
           FROM characteristic_reviews
          INNER JOIN characteristics
          ON characteristics.product_id=48432
          WHERE characteristic_reviews.char_id=characteristics.id
          GROUP BY characteristics.id)AS inner_characteristics) AS characteristics`,
    values: [product_id]
  }
  try {
    const res = await db.query(query);
    return res.rows;
  } catch (err) {
    return err.stack;
  }
}

// const postReview = async()

module.exports = { markAsHelpful, reportReview, getReviews, getMeta };