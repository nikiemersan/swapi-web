import { Starship, StarshipState } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getStarships = (state: RootState): StarshipState =>
  state.starships;

export const getStarshipById = (state: RootState, id: number): Starship =>
  state.starships[id] || emptyObject;
