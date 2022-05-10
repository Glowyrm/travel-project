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
        <p>Starting from {trip.departureCity}</p>
        <p>Final Destination {trip.arrivalCity}</p>
        <p>Total ETT {trip.totalTravelTime} hours</p>
      </div>

      <StagesList stages={trip.stages} />
    </div>
  );
};

export default TripOverview;
