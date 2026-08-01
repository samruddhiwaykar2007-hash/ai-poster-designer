const express = require('express');
const router = express.Router();
const {
  generatePoster,
  getHistory,
  deletePoster
} = require('../controllers/posterController');

router.post('/generate', generatePoster);
router.get('/history', getHistory);
router.delete('/:id', deletePoster);

module.exports = router;