const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const key = require('../../config/keys');

router.get('/test',(req,res)=>res.json({msg:'user world'}));

//input validation on registration
const validateRegister= require('../../validation/registration');

//input validation login
const validateLogin= require('../../validation/login');

//@rout Post api/user/register
//@desc register user
//@access public
router.post('/register',(req,res)=>{
    const {errors,isValid} = validateRegister(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    User
    .findOne({email:req.body.email})
    .then(user => {
        if(user){
            errors.email="Email is already exist";
            return res.status(400).json(errors);
        } else{
            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                address : req.body.address,
                password : req.body.password
            }); 
            
            bcrypt.genSalt(10,(err,salt)=> {
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password=hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err =>console.log(err));
                })
            })
        }
    } );
});

//@rout GET api/user/login
//@desc Login user / returning jwt token
//@access public

router.post('/login',(req,res)=>{
  
    const {errors,isValid} = validateLogin(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    var email = req.body.email;
    var password = req.body.password;

    //find by email
    User.findOne({email})
        .then(user => {
            if(!user){
                errors.email= 'user not found';
                return res.status(404).json(errors);
            }
            //compare password
            bcrypt.compare(password,user.password)
                .then(isMatch => {
                    if(isMatch){
                        //return res.json({msg : 'successfully loged'});

                        //create jwt payload
                        const payload = ({id : user.id, name : user.name});

                        //sign token
                        jwt.sign(payload,key.secretKey,{expiresIn : 3600},(err,token)=>{
                            res.json({
                                success :true,
                                token : 'bearer ' + token
                            });
                        })


                    }else{
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
        });
});

//@rout GET api/user/current
//@desc return current user
//@access private
router.get('/current',passport.authenticate('jwt',{session : false}),
    (req,res)=> {
        res.json({
            id  : req.user.id,
            name : req.user.name,
            email:req.user.email
        });
})

module.exports=router;