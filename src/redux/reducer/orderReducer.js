import {CATEGORY_ID, AREA_ID, PACKAGE_ID} from '../actionTypes';

const initialState = {
  category_id: '',
  categoryname: '',
  area_id: '',
  areaname: '',
  package_id: '',
  Packagename: '',
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_ID:
      return {
        ...state,
        category_id: action.payload.id,
        categoryname: action.payload.categoryname,
      };
    case AREA_ID:
      return {
        ...state,
        area_id: action.payload.id,
        areaname: action.payload.areaname,
      };
    case PACKAGE_ID:
      return {
        ...state,
        package_id: action.payload.id,
        Packagename: action.payload.Packagename,
      };
    default:
      return state;
  }
};
export default orderReducer;
