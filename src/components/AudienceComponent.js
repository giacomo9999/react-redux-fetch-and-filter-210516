import { useState } from "react";

const Audience = (props) => {
  const [showDetails, toggleShowDetails] = useState(false);
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
        <button onClick={() => toggleShowDetails(!showDetails)}>
          Show Details
        </button>
      </div>
      {showDetails ? detailsBlock() : null}
    </div>
  );
};

export default Audience;
