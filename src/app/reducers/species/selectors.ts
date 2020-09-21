import { Species } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getSpecies = (state: RootState): Species[] => state.species.items;

export const getSpeciesById = (state: RootState, id: number): Species =>
  state.species.items[id] || emptyObject;

export const isSpeciesLoading = (state: RootState) => state.species.isLoading;

export const isSpeciesLoaded = (state: RootState) => state.species.isLoaded;
