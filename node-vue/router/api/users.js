const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const User = require('../../models/User')
const key = require('../../config/key')

router.get('/test',(req,res) => {
    res.send('test')

})

router.post('/register',(req,res) => {
    // console.log('register is working')

    User.findOne({email: req.body.email}).then(
        (user) =>{
            if(user){
                return res.status(400).json('此邮箱已注册')
            }else{

                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    identity:req.body.identity,
                    avatar
                })

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if(err) throw err;
                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        }
    )

})


router.post('/login',(req,res) => {
    // console.log('login is working')
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(
        (user) => {
            if(!user) {
                return res.status(400).json('此用户不存在，请注册')
            }
            // 匹配密码
            bcrypt.compare(password, user.password).then(isMatch =>{
                if (isMatch) {
                    const rule = {
                        id:user.id,
                        name:user.name,
                        avatar: user.avatar,
                        identity:user.identity
                    }
                    jwt.sign(rule, key.Key, { expiresIn: 3600},(err,token) => {
                        if(err) throw err;

                        res.json({
                            success:true,
                            token:'Bearer ' + token
                        })
                    });

                } else{
                    return res.status(400).json('密码错误')
                }
            })
        })
})

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        // res.json('working')
        res.json({
            id:req.user.id,
            name:req.user.name,
            email:req.user.email,
            identity:req.user.identity,
        })

})
module.exports = router;
