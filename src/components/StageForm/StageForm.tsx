import React, { useEffect, useState } from "react";
import {
  travelMethods,
  TravelStage,
  TravelType,
  UniqueTravelStage,
} from "../../store/tripStore";
import "./StageForm.css";

interface Props {
  stage: UniqueTravelStage;
}

const StageForm: React.FC<Props> = ({ stage }) => {
  const [departureCity, setDepartureCity] = useState<string>(
    stage.departureCity
  );
  const [arrrivalCity, setArrivalCity] = useState<string>(stage.arrivalCity);
  const [travelMode, setTravelMode] = useState<TravelType | "">(
    stage.transportMode
  );
  const [travelTime, setTravelTime] = useState<number>(stage.travelTime);
  const [preventEdit, setPreventEdit] = useState<boolean>(stage.isSaved);

  useEffect(() => {
    setDepartureCity(stage.departureCity);
    setArrivalCity(stage.arrivalCity);
    setTravelMode(stage.transportMode);
    setTravelTime(stage.travelTime);
  }, [stage]);

  useEffect(() => {
    setPreventEdit(stage.isSaved);
  }, [stage]);

  const AllowEdit = () => {
    setPreventEdit(false);
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    let result = {
      departureCity,
      arrrivalCity,
      travelMode,
      travelTime,
    };
    console.log("You created this route: \n", JSON.stringify(result, null, 3));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <label htmlFor="city-departure">Departure City</label>
        <input
          id="city-departure"
          type="text"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
          required
          disabled={preventEdit}
          placeholder="Traveling from..."
        />
      </div>

      <div className="form-item">
        <label htmlFor="city-arrival">Arrival City</label>
        <input
          id="city-arrival"
          type="text"
          value={arrrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
          required
          disabled={preventEdit}
          placeholder="Traveling to..."
        />
      </div>

      <div className="form-item">
        <label htmlFor="transportation">Traveling by... ?</label>
        <select
          id="transportation"
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value as TravelType)}
          required
          disabled={preventEdit}
          name="transportation"
        >
          <option value="notSelected" disabled>
            Choose Transport
          </option>
          {travelMethods.map((t) => (
            <option value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="form-item">
        <label htmlFor="travel-time">Est. Travel Time</label>
        <input
          id="travel-time"
          type="number"
          value={travelTime}
          onChange={(e) => setTravelTime(parseInt(e.target.value, 10))}
          required
          disabled={preventEdit}
          min={1}
          max={26280}
        />
      </div>

      <div className="button-group">
        <button className="form-submit" type="button" onClick={AllowEdit}>
          Edit Stage
        </button>

        <button className="form-submit" type="submit" disabled={preventEdit}>
          Add Stage
        </button>
      </div>
    </form>
  );
};

export default StageForm;
