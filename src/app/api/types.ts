import { Category } from "../reducers/category/types";
import { ListFilms } from "../reducers/film/types";
import { ListPeople } from "../reducers/people/types";
import { ListPlanets } from "../reducers/planet/types";
import { ListSpecies } from "../reducers/species/types";
import { ListStarships } from "../reducers/starship/types";
import { ListVehicles } from "../reducers/vehicle/types";

export type ApiResponse =
  | Category
  | ListFilms
  | ListPeople
  | ListPlanets
  | ListSpecies
  | ListStarships
  | ListVehicles;
