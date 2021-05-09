import {VIEW_ORDER} from '../actionTypes';

const initialState = {
  orderData: [],
};

const viewOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_ORDER:
      return {
        ...state,
        orderData: action.payload,
      };
    default:
      return state;
  }
};
export default viewOrderReducer;
