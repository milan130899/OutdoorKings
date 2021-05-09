import {TOKEN} from '../actionTypes';

const initialState = {
  login_token: '',
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        login_token: action.payload,
      };

    default:
      return state;
  }
};
export default tokenReducer;
