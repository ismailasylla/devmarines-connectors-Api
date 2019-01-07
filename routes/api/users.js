const express = require('express');
const router = express.Router();

// @route   Get api/users/test
// @desc    Test Users Route
// @access  Public Route
router.get('/test', (req, res) => {
  res.json({ msg: 'users works' });
});

module.exports = router;
