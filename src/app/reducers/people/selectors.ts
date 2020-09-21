import { People } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getPeople = (state: RootState): People[] => state.people.items;

export const getPeopleById = (state: RootState, id: number): People =>
  state.people.items[id] || emptyObject;

export const isPeopleLoading = (state: RootState) => state.people.isLoading;

export const isPeopleLoaded = (state: RootState) => state.people.isLoaded;
