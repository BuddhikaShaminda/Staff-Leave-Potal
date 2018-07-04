import axios from 'axios';
import {
  GET_REQUEST,
  LOADIND_REQUEST, 
} from '../actions/types';

// Get leave request
export const getLeaveRequest = () => dispatch => {
    dispatch(setRequestLoading());
    axios
      .get('/api/admin')
      .then(res =>
        dispatch({
          type: GET_REQUEST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_REQUEST,
          payload: {}
        })
      );
  };
  // Profile loading
export const setRequestLoading = () => {
    return {
      type: LOADIND_REQUEST
    };
};