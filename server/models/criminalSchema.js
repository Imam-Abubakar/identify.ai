const mongoose = require('mongoose');

const criminalSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  descriptions: {
    type: Array,
    required: true,
  },
  mugshot: {
    type: String, 
    required: true,
  },
  criminalRecord: {
    type: String, 
    default: [],
  },
  detected: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Criminal = mongoose.model('Criminal', criminalSchema);
module.exports = Criminal;
