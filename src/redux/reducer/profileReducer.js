import {VIEW_PROFILE} from '../actionTypes';

const initialState = {
  userData: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_PROFILE:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
export default profileReducer;
