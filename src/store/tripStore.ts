import { action, computed, makeObservable, observable } from "mobx";

export const travelMethods = [
  "Bus",
  "Car",
  "Plane",
  "Train",
  "Rocket",
] as const;

export type TravelType = typeof travelMethods[number] | "notSelected";

export interface TripStoreType {
  title: string;
  departureCity: string;
  arrivalCity: string;
  transportList: TravelType[];
  totalTravelTime: number;
  tripStages: UniqueTravelStage[];
  totalStages: number;
  addStage: (stage: UniqueTravelStage) => changeResult;
  removeStage: (stage: UniqueTravelStage) => changeResult;
  tripDetails: string;
}

export interface TravelStage {
  departureCity: string;
  arrivalCity: string;
  transportMode: TravelType;
  travelTime: number;
}

export interface UniqueTravelStage extends TravelStage {
  id: string;
  isSaved: boolean;
}

export interface changeResult {
  wasSuccessful: boolean;
  message: string;
}

interface FindIndex {
  found: boolean;
  index: number | undefined;
}

class TripStore implements TripStoreType {
  readonly title: string;

  tripStages: UniqueTravelStage[] = [];

  constructor(title: string) {
    this.title = title;

    makeObservable(this, {
      title: observable,
      tripStages: observable,
      totalStages: computed,
      arrivalCity: computed,
      departureCity: computed,
      totalTravelTime: computed,
      transportList: computed,
      tripDetails: computed,
      addStage: action.bound,
      removeStage: action.bound,
    });
  }

  get totalStages(): number {
    return this.tripStages.length;
  }

  get hasStages(): boolean {
    return this.totalStages > 0;
  }

  get isStagesEmpty(): boolean {
    return this.totalStages === 0;
  }

  get arrivalCity(): string {
    if (this.isStagesEmpty) return "";
    let lastStage = this.totalStages - 1;
    return this.tripStages[lastStage].arrivalCity;
  }

  get departureCity(): string {
    if (this.isStagesEmpty) return "";
    return this.tripStages[0].departureCity;
  }

  get totalTravelTime(): number {
    if (this.isStagesEmpty) return 0;
    let result: number = this.tripStages.reduce(
      (total, { travelTime }) => total + travelTime,
      0
    );
    return result;
  }

  get transportList(): TravelType[] {
    if (this.isStagesEmpty) return [];
    let result: TravelType[] = this.tripStages.map((s) => s.transportMode);
    return result;
  }

  get tripDetails(): string {
    let result = {
      depart: this.departureCity,
      arrive: this.arrivalCity,
      totalTime: this.totalTravelTime,
      stages: this.tripStages,
    };
    return JSON.stringify(result, null, 4);
  }

  findStageIndex(id: string): FindIndex {
    if (this.isStagesEmpty) return { found: false, index: undefined };
    let targetIndex;
    let index = 0;

    for (const stage of this.tripStages) {
      if (stage.id === id) {
        targetIndex = index;
        break;
      }
      index++;
    }

    let result: FindIndex =
      typeof targetIndex == undefined
        ? { found: false, index: undefined }
        : { found: true, index: targetIndex };

    return result;
  }

  private updateStage(stage: UniqueTravelStage): changeResult {
    let indexObj = this.findStageIndex(stage.id);

    if (indexObj.found === true) {
      const newStages = this.tripStages.map((s, i) => {
        if (i === indexObj.index) return stage;
        return s;
      });
      this.tripStages = newStages;
      return <changeResult>{ wasSuccessful: true, message: stage.id };
    }

    return <changeResult>{
      wasSuccessful: false,
      message: "Stage with Matching ID not found",
    };
  }

  private addNewStage(stage: UniqueTravelStage): changeResult {
    let targetIndex = parseInt(stage.id, 10);

    if (targetIndex < 0 || targetIndex > 5)
      return <changeResult>{
        wasSuccessful: false,
        message: "Not able to add at target index (must be between 0 and 5)",
      };

    // use date + Match.random for unique ID since it will be unique enough for local user session
    const id = `${new Date().valueOf()}-${Math.random()}`;

    const newStage: UniqueTravelStage = { ...stage, id, isSaved: true };
    this.tripStages.splice(targetIndex, 0, newStage);

    // return a result message since this operation may fail
    return <changeResult>{ wasSuccessful: true, message: id.toString() };
  }

  addStage(stage: UniqueTravelStage): changeResult {
    if (this.totalStages > 5) {
      // return a result message explaining reason for failure
      return <changeResult>{
        wasSuccessful: false,
        message: "Total Stages would Exceed max of 5",
      };
    }

    if (stage.isSaved) {
      return this.updateStage(stage);
    }

    return this.addNewStage(stage);
  }

  removeStage(stage: UniqueTravelStage): changeResult {
    if (!stage.isSaved) {
      return <changeResult>{
        wasSuccessful: false,
        message: "Stage had not been saved yet",
      };
    }

    let result = this.findStageIndex(stage.id);
    if (result.found) {
      const newStages = this.tripStages.filter((s) => {
        if (s.id !== stage.id) return s;
      });
      this.tripStages = newStages;
    }

    return <changeResult>{
      wasSuccessful: false,
      message: "Matching stage not found",
    };
  }
}

// default values to use for sanity checks
const tripValues: UniqueTravelStage[] = [
  {
    departureCity: "Houston",
    arrivalCity: "Dallas",
    travelTime: 6,
    transportMode: "Car",
    isSaved: false,
    id: "0",
  },
  {
    departureCity: "Dallas",
    arrivalCity: "Austin",
    travelTime: 4,
    transportMode: "Car",
    isSaved: false,
    id: "1",
  },
  {
    departureCity: "Austin",
    arrivalCity: "San Antonio",
    travelTime: 3,
    transportMode: "Car",
    isSaved: false,
    id: "3",
  },
  {
    departureCity: "San Antonio",
    arrivalCity: "Houston",
    travelTime: 4,
    transportMode: "Car",
    isSaved: false,
    id: "2",
  },
];

const myTrip: TripStoreType = new TripStore("Texas Trip");

// tripValues.forEach((s) => {
//   let { wasSuccessful, message } = myTrip.addStage(s);
//   if (!wasSuccessful)
//     console.log(`Trip stage was NOT added, because: ${message}`);
// });

export default myTrip;
