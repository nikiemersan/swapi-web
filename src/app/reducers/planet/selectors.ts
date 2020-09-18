import { Planet, PlanetState } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getPlanets = (state: RootState): PlanetState => state.planets;

export const getPlanetById = (state: RootState, id: number): Planet =>
  state.planets[id] || emptyObject;
