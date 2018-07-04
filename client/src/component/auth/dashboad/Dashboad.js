import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getCurrentProfile } from "../../../actions/profileAction";
import {getCurrentLeaves} from '../../../actions/leaveActions';
//import AllLeave from "./allLeave";
import Spinner from "../../../component/common/spinner";
import ProfileActions from "./ProfileActions";
import AdminActions from "./AdminActions";
import Moment from 'react-moment';

class Dashboad extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getCurrentLeaves();
   
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { leaves, Loading } = this.props.leave;

    let dashboardContent;
    let leav;
    let list;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //console.log(Object.keys(profile).length);
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        if (user.type !== "admin") {
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome <b>{user.name}</b>
              </p>
              <ProfileActions />
            </div>
          );
        } else {
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome <b>{user.name}</b>
              </p>
              <AdminActions />
            </div>
          );
        }
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    if (leaves === null || Loading) {
      list = <Spinner />;
    } else {
      
      if (leaves.length > 0) {
       list = leaves.map(obj => (
          <tr key={obj._id}>
            <td>{obj.leaveType}</td>
            <td>{obj.reason}</td>
            <td>
              <Moment format="YYYY/MM/DD">{obj.from}</Moment>
            </td>
            <td>
              <Moment format="YYYY/MM/DD">{obj.to}</Moment>
            </td>
            <td>{obj.status}</td>
          </tr>))
      } else {
        list = <h4>No leaves found...</h4>;
      }
    }
    leav =(
    <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Leave Type</th>
              <th scope="col">Reason</th>
              <th scope="col">from</th>
              <th scope="col">to</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
    )

    return (
      <div className="container ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}

              {leav}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboad.propTypes = {
  getCurrentLeaves : PropTypes.func.isRequired,
  leave : PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  leave : state.leave,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile,getCurrentLeaves }
)(Dashboad);
//export default Dashboad;
