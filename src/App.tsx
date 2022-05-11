import { TravelStage, tripStore } from "./store/tripStore";
import "./App.css";
import { TripOverview } from "./components/TripOverview";
import { StagesCarousel } from "./components/StagesCarousel";
import { useState } from "react";

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
    travelTime: 3,
    transportMode: "Car",
  },
  {
    departureCity: "San Antonio",
    arrivalCity: "Austin",
    travelTime: 3,
    transportMode: "Car",
  },
  {
    departureCity: "Austin",
    arrivalCity: "Dallas",
    travelTime: 4,
    transportMode: "Car",
  },
  {
    departureCity: "Dallas",
    arrivalCity: "Houston",
    travelTime: 6,
    transportMode: "Car",
  },
];

const myTrip = new tripStore("Texas Trip");
tripValues.forEach((s) => {
  let { wasSuccessful, message } = myTrip.addStage(s);
  if (!wasSuccessful)
    console.log(`Trip stage was NOT added, because: ${message}`);
});

const App: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const changeIndex = (value: number): void => {
    let potentialIndex = index + value;
    console.log("Button Pressed, Potential index: ", potentialIndex);
    if (potentialIndex >= 0 && potentialIndex <= myTrip.totalStages - 1) {
      console.log("index Changed");
      setIndex(potentialIndex);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Wizard</h1>
      </header>

      <TripOverview trip={myTrip} />
      <StagesCarousel
        stages={myTrip.stages}
        index={index}
        changeIndex={changeIndex}
      />
    </div>
  );
};

export default App;
