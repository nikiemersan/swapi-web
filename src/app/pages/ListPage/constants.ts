import { filmAction, filmSelector } from "../../reducers/film";
import { peopleAction, peopleSelector } from "../../reducers/people";
import { planetAction, planetSelector } from "../../reducers/planet";
import { speciesAction, speciesSelector } from "../../reducers/species";
import { starshipAction, starshipSelector } from "../../reducers/starship";
import { vehicleAction, vehicleSelector } from "../../reducers/vehicle";

import { ListFilms } from "../../reducers/film/types";
import { ListPeople } from "../../reducers/people/types";
import { ListPlanets } from "../../reducers/planet/types";
import { ListSpecies } from "../../reducers/species/types";
import { ListStarships } from "../../reducers/starship/types";
import { ListVehicles } from "../../reducers/vehicle/types";

import {
  CONST_FILMS,
  CONST_PEOPLE,
  CONST_PLANETS,
  CONST_SPECIES,
  CONST_STARSHIPS,
  CONST_VEHICLES,
} from "../../constants";

import { ReduxPromiseAction } from "../../types";

import { ActionByCategoryTypes } from "./types";

export const actionByCategory: ActionByCategoryTypes = {
  [CONST_FILMS]: {
    isLoaded: filmSelector.isFilmLoaded,
    isLoading: filmSelector.isFilmLoading,
    request: filmAction.requestFilms,
    receive: (films) =>
      filmAction.receiveFilms(films as ListFilms) as ReduxPromiseAction<
        ListFilms
      >,
    request_success: filmAction.requestFilmsSuccess,
    get: filmSelector.getFilms,
  },
  [CONST_PEOPLE]: {
    isLoaded: peopleSelector.isPeopleLoaded,
    isLoading: peopleSelector.isPeopleLoading,
    request: peopleAction.requestPeople,
    receive: (people) =>
      peopleAction.receivePeople(people as ListPeople) as ReduxPromiseAction<
        ListPeople
      >,
    request_success: peopleAction.requestPeopleSuccess,
    get: peopleSelector.getPeople,
  },
  [CONST_PLANETS]: {
    isLoaded: planetSelector.isPlanetLoaded,
    isLoading: planetSelector.isPlanetLoading,
    request: planetAction.requestPlanets,
    receive: (planet) =>
      planetAction.receivePlanets(planet as ListPlanets) as ReduxPromiseAction<
        ListPlanets
      >,
    request_success: planetAction.requestPlanetsSuccess,
    get: planetSelector.getPlanets,
  },
  [CONST_SPECIES]: {
    isLoaded: speciesSelector.isSpeciesLoaded,
    isLoading: speciesSelector.isSpeciesLoading,
    request: speciesAction.requestSpecies,
    receive: (species) =>
      speciesAction.receiveSpecies(
        species as ListSpecies
      ) as ReduxPromiseAction<ListSpecies>,
    request_success: speciesAction.requestSpeciesSuccess,
    get: speciesSelector.getSpecies,
  },
  [CONST_STARSHIPS]: {
    isLoaded: starshipSelector.isStarshipLoaded,
    isLoading: starshipSelector.isStarshipLoading,
    request: starshipAction.requestStarships,
    receive: (starships) =>
      starshipAction.receiveStarships(
        starships as ListStarships
      ) as ReduxPromiseAction<ListStarships>,
    request_success: starshipAction.requestStarshipsSuccess,
    get: starshipSelector.getStarships,
  },
  [CONST_VEHICLES]: {
    isLoaded: vehicleSelector.isVehicleLoaded,
    isLoading: vehicleSelector.isVehicleLoading,
    request: vehicleAction.requestVehicles,
    receive: (vehicles) =>
      vehicleAction.receiveVehicles(
        vehicles as ListVehicles
      ) as ReduxPromiseAction<ListVehicles>,
    request_success: vehicleAction.requestVehiclesSuccess,
    get: vehicleSelector.getVehicles,
  },
};
