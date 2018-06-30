import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroups from '../common/TextFieldGroup';

class Register extends Component {

    constructor(){
        super();
        this.state = {
            name : '',
            email : '',
            address : '',
            password : '',
            confirmPassword : '',
            errors : {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors:nextProps.errors});
      }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const newUser ={
            name:this.state.name,
            email:this.state.email,
            address : this.state.address,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        }

        this.props.registerUser(newUser,this.props.history);
    }
  render() {
      const {errors} = this.state;
     
    return (
        <div className="register">
       
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroups
                  placeholder = 'Name'
                  name = 'name'
                  value = {this.state.name}
                  onChange = {this.onChange}
                  error = {errors.name}
                />
                <TextFieldGroups
                  type = 'email'
                  name = 'email'
                  placeholder = 'Email Address'
                  value = {this.state.email}
                  onChange = {this.onChange}
                  error = {errors.email}
                />
                <TextFieldGroups
                name ='address'
                  placeholder = 'Address'
                  value = {this.state.address}
                  onChange = {this.onChange}
                  error = {errors.address}
                />
                <TextFieldGroups
                  type = 'password'
                  placeholder = 'Password'
                  name = 'password'
                  value = {this.state.password}
                  onChange = {this.onChange}
                  error = {errors.password}
                />
                <TextFieldGroups
                  type = 'password'
                  placeholder = 'Confirm Password'
                  name = 'confirmPassword'
                  value = {this.state.confirmPassword}
                  onChange = {this.onChange}
                  error = {errors.confirmPassword}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
}

Register.propTypes ={
  registerUser: propTypes.func.isRequired,
  auth : propTypes.object.isRequired,
  errors : propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default  connect(mapStateToProps,{registerUser})(withRouter(Register)) ;
