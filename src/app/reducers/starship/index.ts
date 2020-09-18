import produce from "immer";

import * as starshipAction from "./action";
import * as starshipSelector from "./selectors";
import { AT, StarshipState, StarshipAction } from "./types";

export const initialState: StarshipState = [];

const starshipReducer = produce(
  (draft: StarshipState = initialState, action: StarshipAction) => {
    switch (action.type) {
      case AT.RECEIVE_STARSHIPS:
        draft = action.result.results;
    }
    return draft;
  }
);

export { starshipAction, starshipReducer, starshipSelector };
