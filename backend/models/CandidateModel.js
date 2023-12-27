const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  dateOfBirth: String,
  workExperience: String,
  resumeTitle: String,
  currentLocation: String,
  postalAddress: String,
  currentEmployer: String,
  currentDesignation: String,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
