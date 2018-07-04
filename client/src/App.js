import React, { Component } from 'react';
import  { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import {Provider} from 'react-redux';

import Navbar from './component/Layout/Navbar';
import Footer from './component/Layout/Footer';
import Landing from './component/Layout/Landing';
import Register from './component/auth/register';
import Login from './component/auth/login';
import Dashboad from './component/auth/dashboad/Dashboad';
import store from './store';
import PrivateRoute from './component/common/PrivateRoute';
import CreateProfile from './component/create-profile/CreateProfile'
import EditProfile from './component/edite-profile/EditeProfile';
import RequestLeave from './component/auth/Leave';
//import LeaveRequest from './component/admin/LeaveRequest';
import LeaveRequest from './component/leaves/Leaves';
import LeaveAccept from './component/leaves/LeaveAccept';
import LeaveReject from './component/leaves/LeaveReject';


import './App.css';
import { clearCurrentProfile } from './actions/profileAction';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store ={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component= {Landing} />
            <div className='continer'>
              <Route exact path="/register" component= {Register} />
              <Route exact path="/login" component= {Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component= {Dashboad} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component= {CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component= {EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/request-leave" component= {RequestLeave} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/getrequest" component= {LeaveRequest} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/getaccept" component= {LeaveAccept} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/getreject" component= {LeaveReject} />
              </Switch>
            </div>   
            <Footer/>    
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;


