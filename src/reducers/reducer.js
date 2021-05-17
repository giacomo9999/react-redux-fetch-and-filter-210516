import * as actionTypes from "../actions/actionTypes";

const initialState = { audienceData: [], displayRange: {} };

const appReducer = (state = initialState, action) => {
  console.log("appReducer...", action, action.fetchedData);
  switch (action.type) {
    case actionTypes.FETCH_DATA:
      console.log("reducer: data array length:", action.fetchedData.length);
      let initialDisplayRange = { start: 0 };
      action.fetchedData.length > 5
        ? (initialDisplayRange.end = 4)
        : (initialDisplayRange.end = action.fetchedData.length - 1);
      return {
        ...state,
        audienceData: action.fetchedData,
        displayRange: initialDisplayRange,
      };
    case actionTypes.DATA_FETCH_ERROR:
      return { ...state, error: action.msg };
    default:
      return state;
  }
};

export default appReducer;
