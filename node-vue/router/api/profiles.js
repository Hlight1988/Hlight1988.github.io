const express = require('express')
const router = express.Router();
const passport = require('passport')
const Profile = require('../../models/Profile')

router.get('/test',(req,res) => {
    console.log('profile is working')
})


// 增
router.post('/add',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        const profileFields = {}

        if(req.body.type) profileFields.type = req.body.type;
        if(req.body.describe) profileFields.describe = req.body.describe;
        if(req.body.income) profileFields.income = req.body.income;
        if(req.body.expend) profileFields.expend = req.body.expend;
        if(req.body.cash) profileFields.cash = req.body.cash;
        if(req.body.remark) profileFields.remark = req.body.remark;

       new Profile(profileFields).save().then(
           profile => {
               res.json(profile)
           }
       )

    })

// 查信息
router.get('/',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {

        Profile.find()
            .then(
                profile => {
                    if(!profile) {
                        return res.status(404).json('未找到任何内容')
                    }else {
                        return res.status(200).json(profile)
                    }
                }
            )
            .catch(err => res.status(404).json(err));
    })

// 查看一条信息
router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        Profile.findOne({_id:req.params.id})
            .then(profile => {
                if(!profile) {
                    return res.status(404).json("查找的内容不存在")
                }else{
                    res.status(200).json(profile)
                }
            })
            .catch(err => res.status(404).json(err))
    })

// 改
router.post('/edit/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        const profileFields = {}

        if(req.body.type) profileFields.type = req.body.type;
        if(req.body.describe) profileFields.describe = req.body.describe;
        if(req.body.income) profileFields.income = req.body.income;
        if(req.body.expend) profileFields.expend = req.body.expend;
        if(req.body.cash) profileFields.cash = req.body.cash;
        if(req.body.remark) profileFields.remark = req.body.remark;

        Profile.findOneAndUpdate(
            {_id:req.params.id},
            {$set:profileFields},
            {new:true}
        ).then(profile => res.json(profile))
    })

// 删
router.delete('/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        Profile.findOneAndRemove({_id:req.params.id})
            .then(profile => {
                profile.save().then(profile => res.json(profile))
            })
            .catch(err => res.status(404).json('删除失败'))

    })
module.exports = router;
