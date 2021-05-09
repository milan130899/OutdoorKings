import {USER_DETAILS} from '../actionTypes';

const initialState = {
  data: [],
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS:
      //console.log('From Reducer of User ======>', action.payload);
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default userDetailsReducer;
