import {
  AREA_ID,
  PACKAGE_ID,
  CATEGORY_ID,
  TOKEN,
  USER_DETAILS,
  VIEW_ORDER,
  VIEW_PROFILE,
} from '../actionTypes';

export const User_Details = (data) => {
  // console.log('USER details Action==>', data);
  return {
    type: USER_DETAILS,
    payload: data,
  };
};
export const Order_Details = (data) => {
  return {
    type: VIEW_ORDER,
    payload: data,
  };
};
export const Profile_Action = (data) => {
  //console.log('USER details Action==>', data);
  return {
    type: VIEW_PROFILE,
    payload: data,
  };
};
export const Category = (data) => {
  //console.log('Category ID Action==>', data);
  return {
    type: CATEGORY_ID,
    payload: data,
  };
};
export const Area = (data) => {
  //.log('Area ID Action==>', data);
  return {
    type: AREA_ID,
    payload: data,
  };
};
export const Package = (data) => {
  //console.log('Package ID Action==>', data);
  return {
    type: PACKAGE_ID,
    payload: data,
  };
};
export const Token = (data) => {
  //console.log('Token ID Action==>', data);
  return {
    type: TOKEN,
    payload: data,
  };
};
