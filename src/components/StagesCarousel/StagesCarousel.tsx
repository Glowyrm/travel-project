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

interface Props {
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

const StagesCarousel: React.FC<Props> = ({ index, changeIndex }) => {
  const [currentStage, setCurrentStage] = useState<UniqueTravelStage>(
    myTrip.totalStages > 0 ? myTrip.tripStages[0] : defaultStage
  );

  useEffect(() => {
    if (myTrip.totalStages > 0) setCurrentStage(myTrip.tripStages[index]);
  }, [index]);

  const updateStage = (stage: UniqueTravelStage) => {
    let result = myTrip.addStage(stage);
    if (!result.wasSuccessful) {
      console.log("Unable to add stage, because: ", result.message);
    }
    setCurrentStage(myTrip.tripStages[index]);
  };

  const setNewStage = (indexDelta: number): void => {
    let newIndex = index + indexDelta;
    let newStage = { ...defaultStage, id: newIndex.toString() };
    setCurrentStage(newStage);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-tabs">
        <p>{`Stage ${index + 1} of ${myTrip.totalStages}`}</p>
      </div>

      <div>
        <StageForm
          stage={currentStage}
          updateStage={updateStage}
          removeStage={myTrip.removeStage}
        />
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
          onClick={() => changeIndex(1)}
          disabled={
            index === myTrip.totalStages - 1 || myTrip.totalStages === 0
          }
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
