const express = require('express');

const router = express.Router();

// @route   Get api/posts/test
// @desc    Test Posts Route
// @access  public Route
router.get('/test', (req, res) => {
  res.json({ msg: 'posts works' });
});

module.exports = router;
