const express = require('express');
const router=express.Router();

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

router.get('/test',(req,res)=>res.json({msg:'Admin world'}));

router.get('/leave-requests',(req,res)=>{

    Profile.find({leave: {$elemMatch: {isAccept:false}}})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports=router;