const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users'); 

router.post('/signup', async (req, res) => {
    let user = await User.findOne({ user: req.body.user });
    if (user) 
    return res.status(400).json({ error: 'User already exists!' });

    user = new User({
        user: req.body.user,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    return res.status(200).json({ message: 'Sign Up Success!' });
});
module.exports = router;

