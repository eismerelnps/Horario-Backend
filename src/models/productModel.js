const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
  },
  model: {
    type: String,
    required: [true, 'El modelo del producto es obligatorio'],
  },
  category: {
    type: String,
    required: [true, 'La categoría del producto es obligatoria'],
  },
  currency: {
    type: String,
    required: [true, 'La moneda del producto es obligatoria'],
  },
  price: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio'],
  },
  offerPrice: {
    type: Number,
    default: 0,
  },
  stocked: {
    type: Boolean,
    default: false,
  },
  inOffer: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: [true, 'La imagen del producto es obligatoria'],
  },
  description: {
    type: String,
    required: [true, 'La descripción del producto es obligatoria'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
