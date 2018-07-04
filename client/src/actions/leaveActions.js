import axios from 'axios';
import { GET_ERRORS,GET_LEAVES,LEAVE_LOADING,GET_LEAVE, SET_CURRENT_USER} from './types';

// leave Request pendings
export const leaveRequest = (expData, history) => dispatch => {
    axios
      .post('/api/leave/', expData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
export const getLeaves = () => dispatch =>{
    dispatch(setLeaveLoading());
    axios
      .get('api/leave/')
      .then(res => 
        dispatch({
          type :GET_LEAVES,
          payload : res.data
        }))
      .catch(err =>
        dispatch({
          type : GET_LEAVES,
          payload : null
      })
   );
  }
  //get accepted
  export const getAccepted = () => dispatch =>{
    dispatch(setLeaveLoading());
    axios
      .get('api/leave/accept')
      .then(res => 
        dispatch({
          type :GET_LEAVES,
          payload : res.data
        }))
      .catch(err =>
        dispatch({
          type : GET_LEAVES,
          payload : null
      })
   );
  }

    //get reject leaves
    export const getReject= () => dispatch =>{
      dispatch(setLeaveLoading());
      axios
        .get('api/leave/reject')
        .then(res => 
          dispatch({
            type :GET_LEAVES,
            payload : res.data
          }))
        .catch(err =>
          dispatch({
            type : GET_LEAVES,
            payload : null
        })
     );
    }

      //get all
export const getCurrentLeaves = () => dispatch => {
  dispatch(setLeaveLoading());
  axios
    .get('api/leave/user_leaves')
    .then(res =>
      dispatch({
        type: GET_LEAVE,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_LEAVE,
        payload: null
      })
    );
}

export const acceptLeave = (obj_id,status) =>dispatch => {
  
  axios
  .post('api/leave/response')
  .then(axios
    .get('api/leave/')
    .then(res => 
      dispatch({
        type :GET_LEAVES,
        payload : res.data
      }))
    .catch(err =>
      dispatch({
        type : GET_LEAVES,
        payload : null
    })
 ))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}


  // leaves loading
export const setLeaveLoading = () => {
  return {
    type: LEAVE_LOADING
  };
};