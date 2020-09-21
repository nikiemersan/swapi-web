import produce from "immer";

import * as planetAction from "./action";
import * as planetSelector from "./selectors";
import { AT, PlanetState, PlanetAction } from "./types";

export const initialState: PlanetState = {
  isLoaded: false,
  isLoading: false,
  items: [],
};

const planetReducer = produce(
  (draft: PlanetState = initialState, action: PlanetAction) => {
    switch (action.type) {
      case AT.REQUEST_PLANETS:
        draft.isLoading = true;
        break;
      case AT.RECEIVE_PLANETS:
        draft.items = draft.items.concat(action.result.results);
        break;
      case AT.REQUEST_PLANETS_SUCCESS:
        draft.isLoaded = true;
        draft.isLoading = false;
        break;
    }
    return draft;
  }
);

export { planetAction, planetReducer, planetSelector };
