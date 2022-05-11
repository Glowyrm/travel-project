import React from "react";
import { TripStoreType } from "../../store/tripStore";
import { StagesList } from "../StagesList";

interface Props {
  trip: TripStoreType;
}

const TripOverview: React.FC<Props> = ({ trip }) => {
  return (
    <div>
      <div>
        <h2>{trip.title}</h2>
        <p>Begin in {trip.departureCity}</p>
        <p>Finish in {trip.arrivalCity}</p>
        <p>Total ETT {trip.totalTravelTime} hours</p>
      </div>

      <StagesList stages={trip.tripStages} />
    </div>
  );
};

export default TripOverview;
