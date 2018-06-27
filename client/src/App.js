import React, { Component } from 'react';
import  { BrowserRouter as Router,Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import {Provider} from 'react-redux';

import Navbar from './component/Layout/Navbar';
import Footer from './component/Layout/Footer';
import Landing from './component/Layout/Landing';
import Register from './component/auth/register';
import Login from './component/auth/login';
import store from './store';

import './App.css';

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
    // TODO: Clear current Profile

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
            </div>
            <div className='continer'>
              <Route exact path="/login" component= {Login} />
            </div>
            <Footer/>    
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;


