const characteristicSchema = new mongoose.Schema({
  product_id: Number,
  characteristic: String,
  value: Number
});

const reviewSchema = new mongoose.Schema({
  product_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number,
  photos: [{url: String}],
  reported: Boolean
});