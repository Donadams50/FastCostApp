const express= require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');




router.get('/profile', passport.authenticate('jwt', { session: false}),  (req, res) =>{
    console.log(req.user)
    return res.json(
       req.user
    );
})



module.exports = router; 