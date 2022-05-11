import React from "react";
import myTrip from "../../store/tripStore";
import { StagesList } from "../StagesList";

const TripOverview: React.FC = () => {
  return (
    <div>
      <div>
        <h2>{myTrip.title}</h2>
        <p>Begin in {myTrip.departureCity}</p>
        <p>Finish in {myTrip.arrivalCity}</p>
        <p>Total ETT {myTrip.totalTravelTime} hours</p>
      </div>

      <StagesList />
    </div>
  );
};

export default TripOverview;
