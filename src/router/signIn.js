const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Xác thực JWT với passport
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: 'your-secret-key'
}, (jwt_payload, done) => {
    User.findById(jwt_payload.id, (err, user) => {
        if(err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);

        }else {
            return done(null, false);
        }
    });
}));

//Tạo API đăng nhập
router.post('/router/signin', (req, res) => {
    const { user, password } = req.body;

    User.findOne({ user: user }, (err, user) => {
        if(err) {
            return res.status(500).json({msg: 'Lỗi Server'});
        }
        if(!user) {
            return res.status(401).json({msg: 'Không tìm thấy user'});
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) {
                return res.status(500).json({msg: 'Lỗi Server'});
            }
            if(isMatch) {
                //Tạo 1 JWT token và trả về cho người dùng
                const payload = {user_id: user._id};
                jwt.sign(payload, 'your-secret-key', (err, token) => {
                    if(err) {
                        return res.status(500).json({msg: 'Lỗi Server'});
                    }
                    return res.status(200).json({token: `Bearer ${token}`});
                })
            }
            else {
                return res.status(401).json({msg: 'Sai mật khẩu'});
            }
        });
    });
});

module.exports = router;
