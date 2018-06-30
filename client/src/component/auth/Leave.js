import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroups from '../common/TextFieldGroup';
import { leaveRequest } from '../../actions/profileAction';

class Leave extends Component {
    constructor(){
        super();
        this.state = {
            date : Date.now(),
            reason : '',
            period : '',
            isAccept: false,
            errors : {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const leaveData = {
            date:this.state.date,
            reason:this.state.reason,
            period:this.state.period,
            //isAccept:this.state.isAccept
        }
        this.props.leaveRequest(leaveData, this.props.history);
        //console.log(leaveData);
    }

  render() {
    const { errors } = this.state;
    return (
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
              <h1 className="display-4 text-center">Request Leave</h1>
              <p className="lead text-center">Please fill the form</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroups
                  type = "Date"
                  error = {errors.date}
                  placeholder = "Date" 
                  name = "date"
                  value = {this.state.date}
                  onChange = {this.onChange}
                />
                <TextFieldGroups
                  error = {errors.reason}
                  placeholder = "reason" 
                  name = "reason"
                  value = {this.state.reason}
                  onChange = {this.onChange}
                />
                <TextFieldGroups
                
                  error = {errors.period}
                  placeholder = "Numer of days request" 
                  name = "period"
                  value = {this.state.period}
                  onChange = {this.onChange}
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

Leave.propTypes ={
    leaveRequest: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps,{leaveRequest})(withRouter(Leave));