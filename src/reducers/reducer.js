import * as actionTypes from "../actions/actionTypes";

const initialState = { audienceData: [], displayStartIndex: 0 };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA:
      return {
        ...state,
        audienceData: action.fetchedData,
        displayStartIndex: 0,
      };
    case actionTypes.DATA_FETCH_ERROR:
      return { ...state, error: action.msg };
    case actionTypes.ADJUST_DISPLAY_RANGE:
      const adjDisplayStart =
        action.rangeAdj > 0
          ? state.displayStartIndex + 5
          : state.displayStartIndex - 5;

      return { ...state, displayStartIndex: adjDisplayStart };
    default:
      return state;
  }
};

export default appReducer;
