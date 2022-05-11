import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { TripStoreType, UniqueTravelStage } from "../../store/tripStore";
import { StageForm } from "../StageForm";
import "./StagesCarousel.css";

interface Props {
  trip: TripStoreType;
  index: number;
  changeIndex: (value: number) => void;
}

const defaultStage: UniqueTravelStage = {
  departureCity: "",
  arrivalCity: "",
  transportMode: "notSelected",
  travelTime: 0,
  isSaved: false,
  id: "0",
};

const StagesCarousel: React.FC<Props> = ({ trip, index, changeIndex }) => {
  let stages = trip.tripStages;
  const [currentStage, setCurrentStage] = useState<UniqueTravelStage>(
    stages[0]
  );

  useEffect(() => {
    setCurrentStage(stages[index]);
  }, [index]);

  const updateStage = (stage: UniqueTravelStage) => {
    let result = trip.addStage(stage);

    console.log(
      result.wasSuccessful
        ? `This route has been added`
        : `This route was not added because: ${result.message}`
    );

    setCurrentStage(stages[index]);
  };

  const setNewStage = (indexDelta: number): void => {
    let newIndex = index + indexDelta;
    let newStage = { ...defaultStage, id: newIndex.toString() };
    setCurrentStage(newStage);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-tabs">
        <p>{`Stage ${index + 1} of ${stages.length}`}</p>
      </div>

      <div>
        <StageForm stage={currentStage} updateStage={updateStage} />
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-button"
          onClick={(e) => changeIndex(-1)}
          disabled={index === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>Prior </span>
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={() => setNewStage(0)}
          disabled={!currentStage.isSaved || stages.length >= 5}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Before</span>
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={() => setNewStage(1)}
          disabled={!currentStage.isSaved || stages.length >= 5}
        >
          <span>Add After</span>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={() => changeIndex(1)}
          disabled={index === stages.length - 1}
        >
          <span>Next</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default StagesCarousel;
