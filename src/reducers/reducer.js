import * as actionTypes from "../actions/actionTypes";

const initialState = {
  audienceData: [],
  displayStartIndex: 0,
  sortParam: "ID",
  sortOrder: "Ascending",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SHOW_DETAILS:
      console.log("reducer...toggling showDetails for ", action.id);
      const adjAudData = state.audienceData;
      adjAudData[action.id].showDetails = !adjAudData[action.id].showDetails;
      return { ...state, audienceData: adjAudData };
    case actionTypes.TOGGLE_SORT_ORDER:
      console.log("reducer....TOGGLE_SORT_ORDER");
      const toggledSortOrder =
        state.sortOrder === "Ascending" ? "Descending" : "Ascending";
      return { ...state, sortOrder: toggledSortOrder };
    case actionTypes.TOGGLE_SORT_PARAM:
      console.log("reducer....TOGGLE_SORT_PARAM");
      const toggledSortParam = state.sortParam === "ID" ? "Name" : "ID";
      return { ...state, sortParam: toggledSortParam };
    case actionTypes.FETCH_DATA:
      const adjFetchedData = action.fetchedData.map((entry) => {
        return { ...entry, showDetails: false };
      });
      return {
        ...state,
        audienceData: adjFetchedData,
        displayStartIndex: 0,
      };
    case actionTypes.DATA_FETCH_ERROR:
      return { ...state, error: action.msg };
    case actionTypes.ADJUST_DISPLAY_RANGE:
      console.log("reducer....ADJUST DISPLAY RANGE");
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
