const validator=require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegister(data){
    let errors= {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.contactNo = !isEmpty(data.ContactNo) ? data.ContactNo : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.password= !isEmpty(data.password) ? data.password : '';
    data.confirmPassword= !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

     if(!validator.isLength(data.name,{min : 5,max : 30})){
         errors.name = "Name must be between 5-10 characters";
     }
    if(validator.isEmpty(data.name)){
         errors.name = "Name is required";
     }
    if(validator.isEmpty(data.email)){
         errors.email = "Email is required";
    }
    if(!validator.isEmail(data.email)){
         errors.email = "Email is Invalid";
    }

    if(validator.isEmpty(data.address)){
         errors.address = "Address is required";
     }
    if(!validator.isLength(data.password,{min : 8})){
         errors.password = "Password must be at least 8 charactors";
    }

    if(validator.isEmpty(data.password)){
         errors.password = "Password is required";
     }

     if(!validator.equals(data.confirmPassword,data.password)){
         errors.confirmPassword = "Confirm Password should match with Password";
     }
     if(validator.isEmpty(data.confirmPassword)){
        errors.confirmPassword = "confirm Password is required";
    }
    return{
        errors,
        isValid : isEmpty(errors)
    }
}