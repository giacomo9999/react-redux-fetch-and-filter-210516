import * as actionTypes from "./actionTypes";

export const addAudience = (payload) => {
  console.log("actions...", payload);
  return {
    type: actionTypes.ADD_AUDIENCE,
    payload,
  };
};

// http://localhost:8080/audiences/${idObj.audienceId}

export const fetchData = (idObj) => {
  let searchString = `http://localhost:8080/audiences?name_like=${idObj.searchTerm}`;

  return (dispatch) => {
    return fetch(searchString)
      .then((res) => res.json())
      .then((json) => {
        const isItInThere = (bigStr, littleStr) => {
          littleStr = littleStr.charAt(0).toUpperCase() + littleStr.slice(1);
          return (
            bigStr.split(",").filter((elem) => elem.includes(littleStr))
              .length !== 0
          );
        };
        const filteredJSON = json.filter(
          (elem) => isItInThere(elem.name, idObj.searchTerm) === true
        );

        dispatch({ type: actionTypes.FETCH_DATA, fetchedData: filteredJSON });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DATA_FETCH_ERROR,
          msg: "Unable to fetch data",
        });
      });
  };
};
