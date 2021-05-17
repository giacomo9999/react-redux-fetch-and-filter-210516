import * as actionTypes from "../actions/actionTypes";

const initialState = { audienceData: [] };

const appReducer = (state = initialState, action) => {
  console.log("appReducer...", action, action.fetchedData);
  switch (action.type) {
    case actionTypes.FETCH_DATA:
      return {
        ...state,
        audienceData: action.fetchedData,
      };
    case actionTypes.DATA_FETCH_ERROR:
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default appReducer;
