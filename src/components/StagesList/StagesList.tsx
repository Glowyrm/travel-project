import React from "react";
import { TripStoreType } from "../../store/tripStore";

interface Props {
  store: TripStoreType;
}

const StagesList: React.FC<Props> = ({ store }) => {
  console.log(store.tripDetails);
  return (
    <ul>
      {store.stages.map((stage) => (
        <li
          key={stage.id}
        >{`${stage.departureCity} to ${stage.arrivalCity} by ${stage.transportMode} in ${stage.travelTime} hours`}</li>
      ))}
    </ul>
  );
};

export default StagesList;
