import produce from "immer";

import * as planetAction from "./action";
import * as planetSelector from "./selectors";
import { AT, PlanetState, PlanetAction } from "./types";

export const initialState: PlanetState = [];

const planetReducer = produce(
  (draft: PlanetState = initialState, action: PlanetAction) => {
    switch (action.type) {
      case AT.RECEIVE_PLANETS:
        draft = action.result.results;
    }
    return draft;
  }
);

export { planetAction, planetReducer, planetSelector };
