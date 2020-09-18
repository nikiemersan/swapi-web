import { People, PeopleState } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getPeople = (state: RootState): PeopleState => state.people;

export const getPeopleById = (state: RootState, id: number): People =>
  state.people[id] || emptyObject;
