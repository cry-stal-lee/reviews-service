const express = require('express');
const router = express.Router();

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

router.put('/:review_id/helpful', (req, res) => {
  res.status(204).send(`You marked ${req.params.review_id} as helpful!`);
})

router.put('/:review_id/report', (req, res) => {
  res.status(204).send(`You reported ${req.params.review_id}!`);
})

module.exports = router;