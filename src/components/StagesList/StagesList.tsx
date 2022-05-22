import { observer } from "mobx-react";
import React from "react";
import myTrip from "../../store/tripStore";
import "./StagesList.css";

const StagesList: React.FC = () => {
  return (
    <>
      {myTrip.tripStages.map((stage, i) => (
        <div
          className={`stage-card ${
            myTrip.index === i ? "stage-cardSelected" : ""
          }`}
          key={stage.id}
        >
          <div className="stage-startCity">{stage.departureCity}</div>
          <div className="stage-endCity">{`To: ${stage.arrivalCity}`}</div>
          <div className="stage-travel">{stage.transportMode}</div>
          <div className="stage-time">{`${stage.travelTime} Hrs.`}</div>
        </div>
      ))}
    </>
  );
};

const StagesListObserver = observer(StagesList);

export default StagesListObserver;
