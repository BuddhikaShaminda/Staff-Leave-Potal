import { GET_ERRORS , SET_CURRENT_USER } from "./types";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


//register user

export const registerUser = (userData,history) => dispatch => {
    axios
        .post('/api/user/register',userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch ({
                type :GET_ERRORS,
                payload: err.response.data
            })
        );     
};

// Get login Token
export const loginUser = userData => dispatch => {
    axios
        .post('/api/user/login',userData)
        .then(res => {
            //save local Storage
            const {token} = res.data;

            //set token to local storage
            localStorage.setItem('jwtToken',token);

            //set in to Autherization Header
            setAuthToken(token);

            //decode the token
            const decoded = jwt_decode(token);

            //set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => 
            dispatch ({
                type :GET_ERRORS,
                payload: err.response.data
            })
        );
};

//set logged in users
export const setCurrentUser = decoded => {
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };
  