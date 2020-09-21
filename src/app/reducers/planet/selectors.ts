import { Planet } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getPlanets = (state: RootState): Planet[] => state.planets.items;

export const getPlanetById = (state: RootState, id: number): Planet =>
  state.planets.items[id] || emptyObject;

export const isPlanetLoading = (state: RootState) => state.planets.isLoading;

export const isPlanetLoaded = (state: RootState) => state.planets.isLoaded;
