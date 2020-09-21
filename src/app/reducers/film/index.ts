import produce from "immer";

import * as filmAction from "./action";
import * as filmSelector from "./selectors";
import { AT, FilmState, FilmAction } from "./types";

export const initialState: FilmState = {
  isLoading: false,
  isLoaded: false,
  items: [],
};

const filmReducer = produce(
  (draft: FilmState = initialState, action: FilmAction) => {
    switch (action.type) {
      case AT.REQUEST_FILMS:
        draft.isLoading = true;
        break;
      case AT.RECEIVE_FILMS:
        draft.items = draft.items.concat(action.result.results);
        break;
      case AT.REQUEST_FILMS_SUCCESS:
        draft.isLoaded = true;
        draft.isLoading = false;
        break;
    }
    return draft;
  }
);

export { filmAction, filmReducer, filmSelector };
