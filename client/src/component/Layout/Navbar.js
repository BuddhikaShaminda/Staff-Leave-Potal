import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileAction";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    // this.props.history.push('/');
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let authLinks
  
    if(isAuthenticated)
    { 
      authLinks = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/dashboard"><small> Dashboard</small></Link>
          </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
           <small>{user.name}</small>
           {" "}
           
            <small>Logout</small>
          </a>
        </li>
      </ul>
     
    
    )}
    else if(isAuthenticated && user.type === "admin"){
      
      authLinks = (
       <ul className="navbar-nav ml-auto">
         <li>
           <Link className="nav-link" to="/dashboard"><small> Dashboard</small></Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to="/dashboard"><small> Leave Requests</small></Link>
         </li>
         <li className="nav-item">
           <a
             href=""
             onClick={this.onLogoutClick.bind(this)}
             className="nav-link"
           >
            <small>{user.name}</small>
            {"  "}
            
             <small>Logout</small>
           </a>
         </li>
       </ul>
     
     )}
    else{

      authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    )}

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            UCSC Staff Leave Portal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" to="/profiles">
                  {" "}
                  Staff Members
                </a>
              </li>
            </ul>
            {authLinks}
          </div>
        </div>
      </nav>
    );
  }
}
  

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect( mapStateToProps,{ logoutUser, clearCurrentProfile })(Navbar);
