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
  const results = await helpers.getReviews(req.query.product_id, sort, count, page);
  res.status(200).send(results);
})

router.get('/meta', async(req, res) => {
  const results = await helpers.getMeta(req.query.product_id);
  res.status(200).send(results);
})

router.post('/', (req, res) => {
  res.status(201).send(`You posted ${JSON.stringify(req.body)}`);
})

router.put('/:review_id/helpful', async(req, res) => {
  await helpers.markAsHelpful(req.params.review_id);
  res.status(204).send();
})

router.put('/:review_id/report', async(req, res) => {
  await helpers.reportReview(req.params.review_id);
  res.status(204).send();
})

module.exports = router;