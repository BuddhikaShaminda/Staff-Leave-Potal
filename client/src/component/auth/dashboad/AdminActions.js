import React from 'react';
import { Link } from 'react-router-dom';

const AdminActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/request-leave" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
          Request Leaves
      </Link>
      <Link to="/getrequest" className="btn btn-light">
        <i className="fas fa-envelope-square text-info mr-1" />
          Leave Request
      </Link>
    </div> 
  );
};

export default AdminActions;
