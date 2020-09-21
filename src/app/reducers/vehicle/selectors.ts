import { Vehicle } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getVehicles = (state: RootState): Vehicle[] =>
  state.vehicles.items;

export const getVehicleById = (state: RootState, id: number): Vehicle =>
  state.vehicles.items[id] || emptyObject;

export const isVehicleLoading = (state: RootState) => state.vehicles.isLoading;

export const isVehicleLoaded = (state: RootState) => state.vehicles.isLoaded;
