import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classname from 'classnames';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/authActions';

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
                <div className="form-group">
                  <input type="text" className={classname("form-control form-control-lg",{'is-invalid': errors.name})} placeholder="Name" name="name" value = {this.state.name}  onChange={this.onChange}  />
                  {
                    errors.name && (
                          <div className = "invalid-feedback">{errors.name}</div>
                      )}
                </div>
                <div className="form-group">
                  <input type="email" className={classname("form-control form-control-lg",{'is-invalid': errors.email})}  value = {this.state.email}  placeholder="Email Address" name="email"  onChange={this.onChange}  />  
                </div>
                {
                    errors.email && (
                          <div className = "invalid-feedback">{errors.email}</div>
                      )}
                <div className="form-group">
                  <input type="text" className={classname("form-control form-control-lg",{'is-invalid': errors.address})}  value = {this.state.address}  placeholder="Address" name="address"  onChange={this.onChange}  /> 
                  {
                    errors.address && (
                          <div className = "invalid-feedback">{errors.address}</div>
                      )} 
                </div>
                <div className="form-group">
                  <input type="password" className={classname("form-control form-control-lg",{'is-invalid': errors.password})}  value = {this.state.password}  placeholder="Password" name="password"  onChange={this.onChange}  />
                  {
                    errors.password && (
                          <div className = "invalid-feedback">{errors.password}</div>
                      )}
                </div>
                <div className="form-group">
                  <input type="password" className={classname("form-control form-control-lg",{'is-invalid': errors.confirmPassword})}  value = {this.state.confirmPassword}  placeholder="Confirm Password" name="confirmPassword"  onChange={this.onChange}  />
                  {
                    errors.confirmPassword && (
                          <div className = "invalid-feedback">{errors.confirmPassword}</div>
                      )}
                </div>
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
