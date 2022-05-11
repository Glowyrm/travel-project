import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { TravelType, UniqueTravelStage } from "../../store/tripStore";
import { StageForm } from "../StageForm";
import "./StagesCarousel.css";

interface Props {
  stages: UniqueTravelStage[];
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

const StagesCarousel: React.FC<Props> = ({ stages, index, changeIndex }) => {
  console.log("my index: ", index);
  const [currentStage, setCurrentStage] = useState<UniqueTravelStage>(
    stages[0]
  );

  useEffect(() => {
    setCurrentStage(stages[index]);
  }, [index]);

  const setNewStage = (indexDelta: number): void => {
    let newIndex = index + indexDelta;
    let newStage = { ...defaultStage, id: newIndex.toString() };
    setCurrentStage(newStage);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-tabs">Form Tabs</div>

      <div>
        <StageForm stage={currentStage} />
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-button"
          onClick={(e) => changeIndex(-1)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            color="white"
            className="carousel-button"
          />
          <span>Prior </span>
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={() => setNewStage(0)}
        >
          <FontAwesomeIcon
            icon={faPlus}
            color="white"
            className="carousel-button"
          />
          <span>Add Before</span>
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={() => setNewStage(1)}
        >
          <span>Add After</span>
          <FontAwesomeIcon
            icon={faPlus}
            color="white"
            className="carousel-button"
          />
        </button>

        <button
          type="button"
          className="carousel-button"
          onClick={() => changeIndex(1)}
        >
          <span>Next</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default StagesCarousel;
