const express = require('express');
const router = express.Router();
const helpers = require('../db/helpers.js');

router.use(express.json());

router.get('/', (req, res) => {
  res.status(200).send(`This is a request for ${req.query.page} pages, ${req.query.count} results per page, sorted by ${req.query.sort}, for product_id ${req.query.product_id}`);
})

router.get('/meta', (req, res) => {
  res.status(200).send(`This is a query for review metadata for product ${req.query.product_id}`);
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