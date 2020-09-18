import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_PLANETS: null,
  RECEIVE_PLANETS: null,
});

export interface Planet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surfaceWater: string;
  terrain: string;
  url: string;
}

export type PlanetState = Planet[];

export type ListPlanets = ListItems<Planet>;

export interface RequestPlanetsAction extends ReduxPromiseAction<ListPlanets> {
  type: typeof AT.REQUEST_PLANETS;
}

export interface ReceivePlanetsAction extends ReduxPromiseAction<ListPlanets> {
  type: typeof AT.RECEIVE_PLANETS;
  result: ListPlanets;
}

export type PlanetAction = RequestPlanetsAction | ReceivePlanetsAction;
