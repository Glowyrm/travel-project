import "./App.css";
import { TripOverview } from "./components/TripOverview";
import { StagesCarousel } from "./components/StagesCarousel";
import { useState } from "react";
import myTrip from "./store/tripStore";

const App: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const changeIndex = (value: number): void => {
    let potentialIndex = index + value;
    if (potentialIndex >= 0 && potentialIndex <= myTrip.totalStages - 1) {
      setIndex(potentialIndex);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Wizard</h1>
      </header>

      <TripOverview />
      <StagesCarousel index={index} changeIndex={changeIndex} />
    </div>
  );
};

export default App;
