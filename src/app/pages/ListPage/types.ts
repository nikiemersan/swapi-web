import { ReduxPromiseAction } from "../../types";

import { Film, ListFilms } from "../../reducers/film/types";
import { ListPeople, People } from "../../reducers/people/types";
import { ListPlanets, Planet } from "../../reducers/planet/types";
import { ListSpecies, Species } from "../../reducers/species/types";
import { ListStarships, Starship } from "../../reducers/starship/types";
import { ListVehicles, Vehicle } from "../../reducers/vehicle/types";
import { RootState } from "../../reducers/types";

export interface ListParamTypes {
  category: string;
}

export interface ActionTypes<T> {
  isLoaded: (state: RootState) => Boolean;
  isLoading: (state: RootState) => Boolean;
  request: () => ReduxPromiseAction<T>;
  receive: (data: T) => ReduxPromiseAction<T>;
  request_success: () => ReduxPromiseAction<T>;
  get: (state: RootState) => AvailableCategoryItemTypes;
}

export type AvailableCategoryTypes =
  | ListFilms
  | ListPeople
  | ListPlanets
  | ListSpecies
  | ListStarships
  | ListVehicles;

export type AvailableCategoryItemTypes =
  | Film[]
  | People[]
  | Planet[]
  | Species[]
  | Starship[]
  | Vehicle[];

export interface ActionByCategoryTypes {
  [key: string]: ActionTypes<AvailableCategoryTypes>;
}
