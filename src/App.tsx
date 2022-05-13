import "./App.css";
import { TripOverview } from "./components/TripOverview";
import { StagesCarousel } from "./components/StagesCarousel";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Wizard</h1>
      </header>

      <TripOverview />
      <StagesCarousel />
    </div>
  );
};

export default App;
