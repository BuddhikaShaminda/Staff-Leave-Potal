const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLeaveInput(data) {
  let errors = {};
  
  data.date = !isEmpty(data.from) ? data.from : '';
  data.reason = !isEmpty(data.reason) ? data.reason : '';
  data.to = !isEmpty(data.to) ? data.to : '';
  data.status = !isEmpty(data.leaveType) ? data.leaveType : '';

  // if (Validator.isEmpty(data.from)) {
  //   errors.from = 'From  field is required';
  // }
  // if (Validator.isEmpty(data.to)) {
  //   errors.to = 'To  field is required';
  //}

  if (Validator.isEmpty(data.reason)) {
    errors.reason = 'Reason field is required';
  }
 /* if (Validator.isEmpty(data.leaveType)) {
    errors.leaveType = 'leave Type field is required';/
  }*/



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
