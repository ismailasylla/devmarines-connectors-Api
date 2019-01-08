const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Load user Model
const user = require('../../models/User');

// @route   Get api/users/test
// @desc    Test Users Route
// @access  Public Route
router.get('/test', (req, res) => {
  res.json({ msg: 'users works' });
});

// @route   Get api/users/register
// @desc    Register a user
// @access  Public Route

router.post('/register', (req, res) => {
  // checking if email already exist
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Image Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      //Creating New User
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // hashing the password ***********
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
