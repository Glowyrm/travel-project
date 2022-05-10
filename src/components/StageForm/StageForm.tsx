import React, { useState } from "react";
import { travelMethods, TravelType } from "../../store/tripStore";
import "./StageForm.css";

const StageForm = () => {
  const [departureCity, setDepartureCity] = useState<string>("");
  const [arrrivalCity, setArrivalCity] = useState<string>("");
  const [travelMode, setTravelMode] = useState<TravelType | "">("");
  const [travelTime, setTravelTime] = useState<number>(0);

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
          placeholder="Traveling to..."
        />
      </div>

      <div className="form-item">
        <label htmlFor="cars">Traveling by... ?</label>
        <select
          id="cars"
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value as TravelType)}
          required
          name="cars"
        >
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
          min={1}
          max={26280}
        />
      </div>

      <button type="submit">Add Route</button>
    </form>
  );
};

export default StageForm;
