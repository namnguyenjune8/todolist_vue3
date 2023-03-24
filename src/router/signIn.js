const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');

const User = require('../models/users');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Xác thực JWT với passport
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}, (jwt_payload, done) => {
    User.findById(jwt_payload.id, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);

        } else {
            return done(null, false);
        }
    });
}));

//Tạo API đăng nhập
router.post('/signin', (req, res) => {
    const { user, password } = req.body;

    User.findOne({ user: user }).exec()
        .then(foundUser => {
            if (!foundUser) {
                return res.status(401).json({ msg: 'Không tìm thấy user' });
            }
            bcrypt.compare(password, foundUser.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ msg: 'Lỗi Server' });
                }
                if (isMatch) {
                    //Tạo 1 JWT token và trả về cho người dùng
                    const payload = { id: foundUser._id };
                    jwt.sign(payload, secret, (err, token) => {
                        if (err) {
                            return res.status(500).json({ msg: 'Lỗi Server' });
                        }
                        return res.status(200).json({ token: `Bearer ${token}` });
                    })
                }
                else {
                    return res.status(401).json({ msg: 'Sai mật khẩu' });
                }
            });
        })
        .catch(err => {
            return res.status(500).json({ msg: 'Lỗi Server' });
        });
});

module.exports = router;
