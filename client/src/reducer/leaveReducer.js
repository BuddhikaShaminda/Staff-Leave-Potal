import {
  GET_LEAVES,
  LEAVE_LOADING, 
  GET_LEAVE
  } from '../actions/types';
  
  const initialState = {
    leaves: null,
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case LEAVE_LOADING:
        return {
          ...state,
          loading: true
        };
        case GET_LEAVES:
        return {
          ...state,
          leaves: action.payload,
          loading: false
        };
        case GET_LEAVE:
        return {
          ...state,
          leaves : action.payload,
          loading : false
        }
        default:
        return state;
    }
  }
