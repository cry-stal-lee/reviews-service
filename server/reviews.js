const express = require('express');
const router = express.Router();
const helpers = require('../db/helpers.js');

router.use(express.json());

router.get('/', async(req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  let sort = req.query.sort || 'newest';
  if (sort === 'newest') {
    sort = `date`;
  }
  try {
    const results = await helpers.getReviews(req.query.product_id, sort, count, page);
    res.status(200).send(results.rows);
  } catch (err) {
    res.status(404).send(err.stack);
  }
})

router.get('/meta', async(req, res) => {
  try {
    const results = await helpers.getMeta(req.query.product_id);
    res.status(200).send(results.rows);
  } catch (err) {
    res.status(404).send(err.stack);
  }
})

router.put('/:review_id/helpful', async(req, res) => {
  try {
    const results = await helpers.markAsHelpful(req.params.review_id);
    res.status(204).send();
  } catch (err) {
    res.status(404).send(err.stack);
  }
})

router.put('/:review_id/report', async(req, res) => {
  try {
    const results = await helpers.reportReview(req.params.review_id);
    res.status(204).send();
  } catch (err) {
    res.status(404).send(err.stack);
  }
})

router.post('/', (req, res) => {
  res.status(201).send(`You posted ${JSON.stringify(req.body)}`);
})

module.exports = router;