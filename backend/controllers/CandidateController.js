const Candidate = require('../models/CandidateModel');

const addCandidate = async (candidate, callback) => {
  try {
    // Check for duplicate email
    const existingCandidate = await Candidate.findOne({ email: candidate.email });
    if (existingCandidate) {
      console.log(`Skipping duplicate record with email: ${candidate.email}`);
      return callback();
    }

    // Save candidate to MongoDB
    await Candidate.create(candidate);
    console.log(`Added candidate with email: ${candidate.email}`);
    callback();
  } catch (error) {
    console.error(`Error processing candidate: ${error.message}`);
    callback(error);
  }
};

module.exports = { addCandidate };
