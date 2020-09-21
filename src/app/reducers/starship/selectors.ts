import { Starship } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getStarships = (state: RootState): Starship[] =>
  state.starships.items;

export const getStarshipById = (state: RootState, id: number): Starship =>
  state.starships.items[id] || emptyObject;

export const isStarshipLoading = (state: RootState) =>
  state.starships.isLoading;

export const isStarshipLoaded = (state: RootState) => state.starships.isLoaded;
