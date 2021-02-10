const express = require('express');
const router = express.Router();
const Poll = require('../model/postModel').Poll;

router.get('/' , (req,res) => {
    res.redirect('/vote');
})
router.get('/vote' , (req,res) => {
    res.render('default/vote');
})
router.post('/' , (req,res) => {
    const newData = new Poll({
        name:req.body.name , 
        voting_choice: req.body.voting_choice,
        casted_at: req.body.casted_at
    });
    if(!req.body.name){
        res.redirect('/')
    }else{
        newData.save().then(data => {
            res.status(200).redirect('/data');
        })
    }
})
router.get('/data' , (req,res) => {
    Poll.find()
        .lean()
        .then(data=>{
            res.status(200).render('default/data' , {data:data})
        })
})
module.exports = router;