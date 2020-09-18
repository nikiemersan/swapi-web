import { ReduxPromiseAction } from "../../types";

import { FilmState, ListFilms } from "../../reducers/film/types";
import { ListPeople, PeopleState } from "../../reducers/people/types";
import { ListPlanets, PlanetState } from "../../reducers/planet/types";
import { ListSpecies, SpeciesState } from "../../reducers/species/types";
import { ListStarships, StarshipState } from "../../reducers/starship/types";
import { ListVehicles, VehicleState } from "../../reducers/vehicle/types";
import { RootState } from "../../reducers/types";

export interface ListParamTypes {
  category: string;
}

export interface ActionTypes<T> {
  request: () => ReduxPromiseAction<T>;
  receive: (data: T) => ReduxPromiseAction<T>;
  get: (state: RootState) => AvailableCategoryStateTypes;
}

export type AvailableCategoryTypes =
  | ListFilms
  | ListPeople
  | ListPlanets
  | ListSpecies
  | ListStarships
  | ListVehicles;

export type AvailableCategoryStateTypes =
  | FilmState
  | PeopleState
  | PlanetState
  | SpeciesState
  | StarshipState
  | VehicleState;

export interface ActionByCategoryTypes {
  [key: string]: ActionTypes<AvailableCategoryTypes>;
}
