import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import * as actions from "./actions/actions";
import AudienceComponent from "./components/AudienceComponent";

const App = () => {
  const audienceData = useSelector((state) => state.audienceData);
  const displayStartIndex = useSelector((state) => state.displayStartIndex);
  const sortParam = useSelector((state) => state.sortParam);
  const sortOrder = useSelector((state) => state.sortOrder);
  const dispatch = useDispatch();
  const audienceSearchTerm = useRef(null);
  const iDSearchStart = useRef(null);
  const iDSearchEnd = useRef(null);

  const handleFetchData = (e) => {
    e.preventDefault();
    if (audienceSearchTerm.current.value === "") {
      alert("Please enter a search term.");
      return null;
    }
    dispatch(
      actions.fetchData({ searchTerm: audienceSearchTerm.current.value })
    );
    audienceSearchTerm.current.value = "";
  };

  const handleFetchById = (e) => {
    e.preventDefault();
    if (iDSearchStart.current.value < 1 || iDSearchEnd.current.value > 12) {
      alert("ID values must be between 1 and 12");
      return null;
    }

    dispatch(
      actions.fetchById({
        start: iDSearchStart.current.value,
        end: iDSearchEnd.current.value,
      })
    );
    iDSearchStart.current.value = "";
    iDSearchEnd.current.value = "";
  };

  const handleAdjustDisplayRange = (val) => {
    dispatch(actions.adjustDisplayRange(val));
  };

  const handleToggleSortParam = () => {
    dispatch(actions.toggleSortParam());
  };

  const handleToggleSortOrder = () => {
    dispatch(actions.toggleSortOrder());
  };

  const lastDisplayIndex = () => {
    return [audienceData.length, displayStartIndex + 5].sort(
      (a, b) => a - b
    )[0];
  };

  const audienceDataDisplay = () => {
    const displayData = audienceData.map((audience, index) => (
      <AudienceComponent key={index} storeIndex={index} audData={audience} />
    ));
    const alphaSort = (arrIn) => {
      return arrIn.sort((a, b) => {
        let fa = a.props.audData.name.toLowerCase(),
          fb = b.props.audData.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    };
    if (sortParam === "ID" && sortOrder === "Ascending") {
      return displayData;
    }
    if (sortParam === "ID" && sortOrder === "Descending") {
      return displayData.reverse();
    }
    if (sortParam === "Name" && sortOrder === "Ascending") {
      return alphaSort(displayData);
    }
    if (sortParam === "Name" && sortOrder === "Descending") {
      return alphaSort(displayData).reverse();
    }
  };

  return (
    <div className="container-outer">
      <h1>Audience App</h1>
      {audienceData.length === 0 ? (
        <h2>-No Data Requested Yet-</h2>
      ) : (
        <div>
          <div>
            {audienceDataDisplay().slice(displayStartIndex, lastDisplayIndex())}
          </div>
          <div className="container-inner info-block">
            <h2>
              {`Showing results ${
                displayStartIndex + 1
              } - ${lastDisplayIndex()} of ${audienceData.length}`}{" "}
            </h2>
            {displayStartIndex > 0 ? (
              <button onClick={() => handleAdjustDisplayRange(-1)}>
                Show Previous
              </button>
            ) : null}
            {audienceData.length > displayStartIndex + 5 ? (
              <button onClick={() => handleAdjustDisplayRange(1)}>
                Show Next
              </button>
            ) : null}

            <h3>{`Sort Parameter: ${sortParam} ??? Sort Order: ${sortOrder}`}</h3>
            <button onClick={handleToggleSortParam}>
              {`Sort By ` + (sortParam === "ID" ? "Name" : "ID")}
            </button>
            <button onClick={handleToggleSortOrder}>
              {`Sort By ` +
                (sortOrder === "Ascending" ? "Descending" : "Ascending")}
            </button>
          </div>
        </div>
      )}

      <form className="h-form">
        <input className="h-input" type="text" ref={audienceSearchTerm} />
        <button className="h-btn" onClick={handleFetchData}>
          Search By Keyword
        </button>
        <div className="spacer20" />
        <label className="h-label">ID Range Start (Min 1):</label>
        <input className="h-input" type="text" ref={iDSearchStart} />
        <div className="spacer10" />
        <label className="h-label">ID Range End (Max 12):</label>
        <input className="h-input" type="text" ref={iDSearchEnd} />
        <button className="h-btn" onClick={handleFetchById}>
          Search By ID Range
        </button>
      </form>
    </div>
  );
};

export default App;
