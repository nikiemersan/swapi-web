import produce from "immer";

import * as starshipAction from "./action";
import * as starshipSelector from "./selectors";
import { AT, StarshipState, StarshipAction } from "./types";

export const initialState: StarshipState = {
  isLoaded: false,
  isLoading: false,
  items: [],
};

const starshipReducer = produce(
  (draft: StarshipState = initialState, action: StarshipAction) => {
    switch (action.type) {
      case AT.REQUEST_STARSHIPS:
        draft.isLoading = true;
        break;
      case AT.RECEIVE_STARSHIPS:
        draft.items = draft.items.concat(action.result.results);
        break;
      case AT.REQUEST_STARSHIPS_SUCCESS:
        draft.isLoaded = true;
        draft.isLoading = false;
        break;
    }
    return draft;
  }
);

export { starshipAction, starshipReducer, starshipSelector };
