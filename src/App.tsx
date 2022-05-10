import { TravelStage, tripStore } from "./store/tripStore";
import "./App.css";
import { StageForm } from "./components/StageForm";
import { TripOverview } from "./components/TripOverview";

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

const App: React.FC = () => {
  const myTrip = new tripStore("Texas Trip");
  tripValues.forEach((currentStage) => {
    let { wasSuccessful, message } = myTrip.addStage(currentStage);
    if (!wasSuccessful)
      console.log(`Trip stage was NOT added, because: ${message}`);
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Wizard</h1>
      </header>
      <TripOverview trip={myTrip} />
      <StageForm />
    </div>
  );
};

export default App;
