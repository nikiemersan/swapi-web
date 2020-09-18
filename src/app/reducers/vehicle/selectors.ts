import { Vehicle, VehicleState } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getVehicle = (state: RootState): VehicleState => state.vehicles;

export const getVehicleById = (state: RootState, id: number): Vehicle =>
  state.vehicles[id] || emptyObject;
