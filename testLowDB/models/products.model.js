const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Product = mongoose.model('products', productSchema); // tham số 1: tên đặt, ts3: gán model vào colection trong robo3T

module.exports= Product;