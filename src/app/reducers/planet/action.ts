import {
  AT,
  ListPlanets,
  ReceivePlanetsAction,
  RequestPlanetsAction,
} from "./types";

export const requestPlanets = (): RequestPlanetsAction => {
  return {
    type: AT.REQUEST_PLANETS,
  };
};

export const receivePlanets = (planets: ListPlanets): ReceivePlanetsAction => {
  return {
    type: AT.RECEIVE_PLANETS,
    result: planets,
  };
};
