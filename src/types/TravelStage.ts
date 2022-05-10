export type TransportModes = "Bus" | "Car" | "Plane" | "Rocket" | "Train";

export interface TravelStage {
  departureCity: string;
  arrivalCity: string;
  transportMode: TransportModes;
  travelTime: number;
}

export interface UniqueTravelStage extends TravelStage {
  id: string;
}
