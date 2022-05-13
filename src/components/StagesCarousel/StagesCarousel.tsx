import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import myTrip, { UniqueTravelStage } from "../../store/tripStore";
import { StageForm } from "../StageForm";
import "./StagesCarousel.css";

const defaultStage: UniqueTravelStage = {
  departureCity: "",
  arrivalCity: "",
  transportMode: "notSelected",
  travelTime: 0,
  isSaved: false,
  id: "0",
};

const StagesCarousel: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<UniqueTravelStage>(
    myTrip.totalStages > 0 ? myTrip.tripStages[0] : defaultStage
  );

  useEffect(() => {
    if (myTrip.totalStages > 0) {
      console.log("setting new stage");
      setCurrentStage(myTrip.tripStages[myTrip.index]);
    } else {
      setCurrentStage(defaultStage);
      console.log("setting default stage");
    }
  }, [myTrip.index]);

  const updateStage = (stage: UniqueTravelStage) => {
    let result = myTrip.addStage(stage);
    if (result.wasSuccessful) {
      if (!stage.isSaved) {
        let newStageIndex = parseInt(stage.id, 10);
        myTrip.setIndex(newStageIndex);
        setCurrentStage(myTrip.tripStages[myTrip.index]);
      }
    }
  };

  const setNewStage = (indexDelta: number): void => {
    let newIndex = myTrip.index + indexDelta;
    let newStage = { ...defaultStage, id: newIndex.toString() };
    setCurrentStage(newStage);
  };

  const removeStage = (stage: UniqueTravelStage): void => {
    if (stage.isSaved) {
      let result = myTrip.removeStage(stage);
      if (result.wasSuccessful) {
        if (myTrip.lastStageIndex >= 0) {
          myTrip.setIndex(myTrip.lastStageIndex);
        } else {
          myTrip.setIndex(0);
          setCurrentStage(defaultStage);
        }
      }
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-tabs">
        {currentStage.isSaved && (
          <p>{`Stage ${myTrip.index + 1} of ${myTrip.totalStages}`}</p>
        )}
        {!currentStage.isSaved && (
          <p>{`New Stage at position ${myTrip.index + 1}`}</p>
        )}
      </div>

      <div>
        <StageForm
          stage={currentStage}
          updateStage={updateStage}
          removeStage={removeStage}
        />
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-button"
          onClick={myTrip.decrementIndex}
          disabled={myTrip.index === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>Prior </span>
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={() => setNewStage(0)}
          disabled={!currentStage.isSaved || myTrip.totalStages >= 5}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Before</span>
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={() => setNewStage(1)}
          disabled={!currentStage.isSaved || myTrip.totalStages >= 5}
        >
          <span>Add After</span>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={myTrip.incrementIndex}
          disabled={myTrip.index > myTrip.totalStages - 2}
        >
          <span>Next</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

const StagesCarouselObserver = observer(StagesCarousel);

export default StagesCarouselObserver;
