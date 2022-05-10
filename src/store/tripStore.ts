import {
  TransportModes,
  TravelStage,
  UniqueTravelStage,
} from "../types/TravelStage";
import { action, computed, makeObservable, observable } from "mobx";

interface addResult {
  wasSuccessful: boolean;
  message: string;
}

export interface TripStoreType {
  title: string;
  departureCity: string;
  arrivalCity: string;
  transportList: TransportModes[];
  totalTravelTime: number;
  stages: UniqueTravelStage[];
  addStage: (stage: TravelStage) => addResult;
  tripDetails: string;
}

export class tripStore implements TripStoreType {
  readonly title: string;
  departureCity: string = "";
  arrivalCity: string = "";
  transportList: TransportModes[] = [];
  totalTravelTime: number = 0;
  stages: UniqueTravelStage[] = [];

  constructor(title: string) {
    this.title = title;
    makeObservable(this, {
      title: observable,
      departureCity: observable,
      arrivalCity: observable,
      transportList: observable,
      totalTravelTime: observable,
      stages: observable,
      addStage: action,
      tripDetails: computed,
    });
  }

  addStage(stage: TravelStage): addResult {
    if (this.stages.length < 5) {
      // use date for unique ID since it will be unique enough for local user session
      const id = `${new Date().valueOf()}-${Math.random()}`;
      const newStage: UniqueTravelStage = { ...stage, id };
      this.stages.push(newStage);
      if (this.departureCity === "") this.departureCity = stage.departureCity;
      this.arrivalCity = stage.arrivalCity;
      this.transportList.push(stage.transportMode);
      this.totalTravelTime += stage.travelTime;
      // return a result message since this operation may fail
      return <addResult>{ wasSuccessful: true, message: id.toString() };
    }
    // return a result message explaining reason for failure
    return <addResult>{
      wasSuccessful: false,
      message: "Total Stages would Exceed max of 5",
    };
  }

  get tripDetails(): string {
    let result = {
      depart: this.departureCity,
      arrive: this.arrivalCity,
      totalTime: this.totalTravelTime,
      stages: this.stages,
    };
    return JSON.stringify(result, null, 4);
  }
}
