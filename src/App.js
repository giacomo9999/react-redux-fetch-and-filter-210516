import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions/actions";
import { useRef } from "react";

const App = () => {
  const audienceData = useSelector((state) => state.audienceData);
  const dispatch = useDispatch();
  const audienceSearchTerm = useRef(null);

  const handleFetchData = () => {
    console.log("handleAddAudience...", audienceSearchTerm.current.value);
    dispatch(
      actions.fetchData({ searchTerm: audienceSearchTerm.current.value })
    );
    audienceSearchTerm.current.value = "";
  };

  return (
    <div className="container-outer">
      <h1>APP</h1>

      {audienceData.length === 0 ? (
        <h2>No Data In</h2>
      ) : (
        audienceData.map((audience, index) => (
          <p key={index}>{audience.name}</p>
        ))
      )}
      <input type="text" ref={audienceSearchTerm} />
      <button onClick={handleFetchData}>Search By Keyword</button>
    </div>
  );
};

export default App;
