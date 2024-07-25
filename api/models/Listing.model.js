const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

   description: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  regulatPrice: {
    type: Number,
    required: true,
  },

  discountPrice: {
    type: Number,
    required: true,
  },

  bathrooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },

  furnished: {
    type: Boolean,
    required: true,
  },

  parking: {
    type: Boolean,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  offer: {
    type: String,
    required: true,
  },

  imageUrls: {
    type: String,
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  }
},{timestamps:true});


module.exports = mongoose.model('Listing',listingSchema);