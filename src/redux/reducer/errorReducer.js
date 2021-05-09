import {EMAIL_ERROR, PASSWORD_ERROR} from '../actionTypes';
initialState = {
  emailError: '',
  passwordError: '',
};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_ERROR:
      return {
        ...state,
        emailError: action.payload,
      };
    case PASSWORD_ERROR:
      return {
        ...state,
        passwordError: action.payload,
      };

    default:
      return state;
  }
};
export default errorReducer;
