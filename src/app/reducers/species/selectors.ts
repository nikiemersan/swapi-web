import { Species, SpeciesState } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getSpecies = (state: RootState): SpeciesState => state.species;

export const getSpeciesById = (state: RootState, id: number): Species =>
  state.species[id] || emptyObject;
