import { observer } from "mobx-react";
import React from "react";
import myTrip from "../../store/tripStore";
import { StagesList } from "../StagesList";
import "./TripOverview.css";

const TripOverview: React.FC = () => {
  return (
    <div className="overview-container">
      <div>
        <h2 className="overview-heading">{myTrip.title}</h2>
        <p>
          From {myTrip.departureCity} to {myTrip.arrivalCity} in{" "}
          {myTrip.totalTravelTime} hours
        </p>
      </div>

      <StagesList />
    </div>
  );
};

const TripOverviewObserver = observer(TripOverview);

export default TripOverviewObserver;
