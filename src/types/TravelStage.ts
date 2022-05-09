export interface TravelStage {
  departureCity: string;
  arrivalCity: string;
  transportMode: "Bus" | "Car" | "Plane" | "Rocket" | "Train";
  travelTime: number;
}

export interface UniqueTravelStage extends TravelStage {
  id: number;
}
