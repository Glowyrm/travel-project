import { useState } from "react";
import { tripStore } from "./store/tripStore";
import "./App.css";
import { TravelStage } from "./types/TravelStage";

const tripValues: TravelStage[] = [
  {
    departureCity: "Houston",
    arrivalCity: "Dallas",
    travelTime: 6,
    transportMode: "Car",
  },
  {
    departureCity: "Dallas",
    arrivalCity: "Austin",
    travelTime: 4,
    transportMode: "Car",
  },
  {
    departureCity: "Austin",
    arrivalCity: "San Antonio",
    travelTime: 4,
    transportMode: "Car",
  },
];

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const myTrip = new tripStore();
  tripValues.forEach((currentStage) => myTrip.addStage(currentStage));
  console.log(myTrip.stagesList);

  return (
    <div className="App">
      <header className="App-header">
        <p>Travel Wizard</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  );
};

export default App;
