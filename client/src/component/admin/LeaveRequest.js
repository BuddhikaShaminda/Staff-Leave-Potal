import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import Moment from 'react-moment';
import {getLeaveRequest} from '../../actions/adminAction';

class LeaveRequest extends Component {
  componentDidMount(){
    this.props.getLeaveRequest();
  }
  render() {
    const LeaveRequest = this.props.leave.map(exp => (
      <tr key={exp._id}>
        <td>{exp.handle}</td> 
        <td>{exp.leave[0].date} </td>
        <td>{exp.leave[0].reason}</td>
        <td>{exp.leave[0].period}</td>
        
        <td>
          <button
            onClick={this.onAcceptClick.bind(this, exp._id)}
            className="btn btn-success"
          >
            Accept
          </button>
          <button
            onClick={this.onRejectClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Reject
          </button>

        </td>
      </tr>
        ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
         <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Period</th>          
            </tr>
           {LeaveRequest}
          </thead>
        </table>
      </div>
    );
  }
}

LeaveRequest.propTypes = {
  getLeaveRequest : PropTypes.func.isRequired,
  leaverequest : PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  leaverequest : state.leaverequest
});

export default connect(mapStateToProps,{getLeaveRequest})(LeaveRequest);
//export default LeaveRequest;
