// server/app.js
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const async = require('async');

const app = express();
const PORT = 4000;

const MONGODB_URI = 'mongodb+srv://abhisahu1908:08AjJZ3KDfkAF5Cw@cluster0.wnzwxeg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Candidate = require('./models/CandidateModel');
const CandidateController = require('./controllers/CandidateController');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('excelFile'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const candidateData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Process candidates one at a time
    async.eachSeries(candidateData, (candidate, callback) => {
      // Use the Candidate model here
      CandidateController.addCandidate(Candidate, candidate, callback);
    }, (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, message: 'Excel processed successfully' });
    });
  } catch (error) {
    console.error(`Error uploading file: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

