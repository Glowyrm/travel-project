import React, { useEffect, useState } from "react";
import {
  AddResult,
  travelMethods,
  TravelType,
  UniqueTravelStage,
} from "../../store/tripStore";
import "./StageForm.css";

interface Props {
  stage: UniqueTravelStage;
  updateStage: (stage: UniqueTravelStage) => void;
}

const StageForm: React.FC<Props> = ({ stage, updateStage }) => {
  const [departureCity, setDepartureCity] = useState<string>(
    stage.departureCity
  );
  const [arrivalCity, setArrivalCity] = useState<string>(stage.arrivalCity);
  const [transportMode, setTransportMode] = useState<TravelType>(
    stage.transportMode
  );
  const [travelTime, setTravelTime] = useState<number>(stage.travelTime);
  const [preventEdit, setPreventEdit] = useState<boolean>(stage.isSaved);

  useEffect(() => {
    setDepartureCity(stage.departureCity);
    setArrivalCity(stage.arrivalCity);
    setTransportMode(stage.transportMode);
    setTravelTime(stage.travelTime);
    setPreventEdit(stage.isSaved);
  }, [stage]);

  const AllowEdit = () => {
    setPreventEdit(false);
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    let result = {
      ...stage,
      departureCity,
      arrivalCity,
      transportMode,
      travelTime,
    };

    updateStage(result);
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
          value={arrivalCity}
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
          value={transportMode}
          onChange={(e) => setTransportMode(e.target.value as TravelType)}
          required
          disabled={preventEdit}
          name="transportation"
        >
          <option value="notSelected" disabled>
            Choose Transport
          </option>
          {travelMethods.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="form-item">
        <label htmlFor="travel-time">Est. Travel Time (Hours)</label>
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
        <button
          className="form-submit"
          type="button"
          onClick={AllowEdit}
          disabled={!preventEdit}
        >
          Edit
        </button>

        <button className="form-submit" type="submit" disabled={preventEdit}>
          {stage.isSaved ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default StageForm;
