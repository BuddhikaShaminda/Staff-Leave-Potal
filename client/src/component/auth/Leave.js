import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroups from '../common/TextFieldGroup';
import { leaveRequest } from '../../actions/leaveActions';
import SelectListGroup from '../common/SelectListGroup';

class Leave extends Component {
    constructor(){
        super();
        this.state = {
            from : Date.now(),
            reason : '',
            name : '',
            to: Date.now(),
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
            name:this.state.name,
            leaveType : this.state.leaveType,
            reason:this.state.reason,
            from:this.state.from,
            to:this.state.to
        }
        this.props.leaveRequest(leaveData, this.props.history);
        //console.log(leaveData);
    }

  render() {
    const { errors } = this.state;
     // Select options for leave Type
     const options = [
      { label: '* Select Leave Type', value: 0 },
      { label: 'Half Day Morning', value: 'Half Day moning' },
      { label: 'Half Day Evening', value: 'Half Day evening' },
      { label: 'short Leave', value: 'short Leave' },
      { label: 'One or More days', value: 'One or More days' },
      
    ];
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

              
              <SelectListGroup
                placeholder="Leave Type"
                name="leaveType"
                value={this.state.leaveType}
                onChange={this.onChange}
                options={options}
                error={errors.status}
          
              />
              <TextFieldGroups
                  error = {errors.reason}
                  placeholder = "reason" 
                  name = "reason"
                  value = {this.state.reason}
                  onChange = {this.onChange}
                />
              <TextFieldGroups
                  type = "Date"
                  error = {errors.from}
                  placeholder = "From" 
                  name = "from"
                  value = {this.state.from}
                  onChange = {this.onChange}
                />
                <TextFieldGroups
                  type = "Date"
                  error = {errors.from}
                  placeholder = "To" 
                  name = "to"
                  value = {this.state.to}
                  info="Fill this if you select type is one or more days"
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