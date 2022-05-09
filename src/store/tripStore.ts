import { TravelStage, UniqueTravelStage } from "../types/TravelStage";

export class tripStore {
  stages: UniqueTravelStage[] = [];

  get totalStages() {
    return this.stages.length;
  }

  get stagesList() {
    return this.stages;
  }

  addStage(stage: TravelStage) {
    // use date for unique ID since it will be unique enough for local user session
    const id = new Date().valueOf();
    const newStage: UniqueTravelStage = { ...stage, id };
    this.stages.push(newStage);
  }
}
