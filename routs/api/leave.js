const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongodb').ObjectID

// Load Validation
const validateLeaveInput = require('../../validation/leave');

// Load LeaveModel 
const Leave = require('../../models/LeaveModel');

router.get('/test', (req, res) => res.json({ msg: 'leave requested' }));

// @route   GET api/leave
// @desc    Get leaves-request
// @access  Private
router.get('/',passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Leave.find({status:'pending'})
    .sort({ date: -1 })
    .then(leaves => res.json(leaves))
    .catch(err => res.status(404).json({ nopostsfound: 'No leaves found' }));
});

// @route   GET api/acceptleave
// @desc    Get leaves-accept
// @access  Private
router.get('/accept',passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Leave.find({status:'Approved'})
    .sort({ date: -1 })
    .then(leaves => res.json(leaves))
    .catch(err => res.status(404).json({ nopostsfound: 'No leaves found' }));
});

// @route   GET api/rejectleave
// @desc    Get leaves-reject
// @access  Private
router.get('/reject',passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Leave.find({status:'reject'})
    .sort({ date: -1 })
    .then(leaves => res.json(leaves))
    .catch(err => res.status(404).json({ nopostsfound: 'No leaves found' }));
}); 

// @route   GET api/user leave
// @desc    Get leaves-accept
// @access  Private
router.get('/user_leaves',passport.authenticate('jwt', { session: false }),
 (req, res) => {
  Leave.find({user_id:req.user._id})
    .sort({ date: -1 })
    .then(leaves => res.json(leaves))
    .catch(err => res.status(404).json({ noleavefound: 'No leaves found' }));
});

// @route   POST api/leaverequest
// @desc    Create or edit user profile
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateLeaveInput(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
      
      const newLeave = new Leave({
        user_id : req.user.id,
        name :req.user.name,
        reason : req.body.reason,
        from : req.body.from,
        to : req.body.to,
        leaveType : req.body.leaveType
      });
      newLeave.save().then(leave => res.json(leave))
      
    });

// @route   Update Leave api/leave
// @desc    Accept or Reject Leaves
// @access  Private

router.post(
  '/response',
  (req,res) => {
    const leaveFields = {};
    leaveFields._id = req.body.id;
    leaveFields.name = req.body.name;
    leaveFields.reason = req.body.reason;
    leaveFields.from = req.body.from;
    leaveFields.to = req.body.to;
    leaveFields.user_id = req.body.user_id;
    leaveFields.leaveType = req.body.leaveType;
    console.log(req.body.name);
    console.log(req.body.id);
    console.log(req.body.status);
    Leave.findOne({_id:ObjectId(req.body.id)})  //{ "_id":ObjectId("req.body.id") }
      .then(leaves => { //return (res.json(leaves))
        if(leaves){
         // return (res.json(leaves))
          Leave.update(
              {_id : req.body.id},
              {$set : leaveFields},
              {new : true})
        }
        res.json("err")
      }
          // Leave.findOneAndUpdate(
          //   {_id : req.body.id},
          //   {$set : leaveFields},
          //   {new : true})
        )
      .catch(err=>res.status(404).json({ noleavefound: 'No leaves found' }));
 
  })

 /* router.post("/accepted", (req, res) => {
    Leave.update(
      { name: req.body.name },
      { $set: { status: "Approve" } }
    ).catch(err => res.json(err));
  });*/

module.exports = router;
