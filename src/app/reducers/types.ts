import { CategoryState } from "./category/types";
import { FilmState } from "./film/types";
import { PeopleState } from "./people/types";
import { PlanetState } from "./planet/types";
import { SpeciesState } from "./species/types";
import { StarshipState } from "./starship/types";
import { VehicleState } from "./vehicle/types";

export interface RootState {
  categories: CategoryState;
  films: FilmState;
  people: PeopleState;
  planets: PlanetState;
  species: SpeciesState;
  starships: StarshipState;
  vehicles: VehicleState;
}
