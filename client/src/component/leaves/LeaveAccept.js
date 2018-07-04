import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import {getAccepted} from '../../actions/leaveActions';
import Moment from 'react-moment';

class LeaveAccept extends Component {
  componentDidMount(){
    this.props.getAccepted();
  }
  render() {
    const { leaves, loading } = this.props.leave;
    let leav;
    let list;
    if (leaves === null || loading) {
      list = <Spinner />;
    } else {
      if (leaves.length > 0) {
       list = leaves.map(obj => (
          <tr key={obj._id}>
            <td>{obj.name}</td>
            <td>{obj.leaveType}</td>
            <td>
              <Moment format="YYYY/MM/DD">{obj.from}</Moment>
            </td>
            <td>
              <Moment format="YYYY/MM/DD">{obj.to}</Moment>
            </td>
            <td>
              <button type="button" class="btn btn-success" style={{margin:'5px'}}>Accept</button>
              <button type="button" class="btn btn-danger" style={{margin:'5px'}}>Reject</button>
            </td>
          </tr>))
      } else {
        list = <small>No leaves found...</small>;
      }
    }
    leav =(
    <table className="table table-hover">
          <thead>
            <tr> 
              <th scope="col">Name</th>
              <th scope="col">Leave Type</th> 
              <th scope="col">Reason</th>
              <th scope="col">from</th>
              <th scope="col">to</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
    )

    return (

      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Leave Requests</h1>
              <p className="lead text-center">
                Unrespond Leave Request
              </p>
              <div className="btn-group mb-4" role="group">
              <Link to="/getrequest" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> Pendings
              </Link>
              <Link to="/getaccept" className="btn btn-light">
                <i className="fab fa-black-tie text-info mr-1" />
                  Accepted
              </Link>
              <Link to="/getreject" className="btn btn-light">
                <i className="fas fa-envelope-square text-info mr-1" />
                  Rejected
              </Link>
            </div> 
              {leav}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LeaveAccept.propTypes ={
  getAccepted : PropTypes.func.isRequired,
  leave : PropTypes.object.isRequired
};

const mapStateToProps = state  => ({
    leave :state.leave
});

export default connect(mapStateToProps,{getAccepted})(LeaveAccept);