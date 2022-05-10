import React from "react";
import { UniqueTravelStage } from "../../store/tripStore";

interface Props {
  stages: UniqueTravelStage[];
}

const StagesList: React.FC<Props> = ({ stages }) => {
  return (
    <ul>
      {stages.map((stage) => (
        <li
          key={stage.id}
        >{`${stage.departureCity} to ${stage.arrivalCity} by ${stage.transportMode} in ${stage.travelTime} hours`}</li>
      ))}
    </ul>
  );
};

export default StagesList;
