import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions/actions";

const Audience = (props) => {
  const showDetails = useSelector(
    (state) => state.audienceData[props.storeIndex].showDetails
  );

  const dispatch = useDispatch();
  const handleToggleShowDetails = () => {
    dispatch(actions.toggleShowDetails(props.storeIndex));
  };

  const detailsBlock = () => {
    return (
      <div className="audience-details">
        <h4>
          {`Total Size: `}
          <b>{props.audData.totalSize}</b>
        </h4>
        {props.audData.dimensions.map((dimension, index) => (
          <div className="audience-detail-entry" key={index}>
            <p>{`Type: ${dimension.type}`}</p>
            <p>{`Size: ${dimension.size}`}</p>
            <p>{`Filters: ${dimension.filters}`}</p>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="container-inner ">
      <div className="audience-plus-button">
        <div className="audience-body">
          <h3>
            {`ID: `}
            <b>{props.audData.id}</b>
          </h3>
          <h3>
            {`Name: `}
            <b>{props.audData.name}</b>
          </h3>
        </div>
        <button onClick={() => handleToggleShowDetails()}>Show Details</button>
      </div>
      {showDetails ? detailsBlock() : null}
    </div>
  );
};

export default Audience;
