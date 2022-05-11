import React from "react";
import myTrip from "../../store/tripStore";

const StagesList: React.FC = () => {
  return (
    <ul>
      {myTrip.tripStages.map((stage) => (
        <li
          key={stage.id}
        >{`${stage.departureCity} to ${stage.arrivalCity} by ${stage.transportMode} in ${stage.travelTime} hours`}</li>
      ))}
    </ul>
  );
};

export default StagesList;
