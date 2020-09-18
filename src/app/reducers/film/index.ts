import produce from "immer";

import * as filmAction from "./action";
import * as filmSelector from "./selectors";
import { AT, FilmState, FilmAction } from "./types";

export const initialState: FilmState = [];

const filmReducer = produce(
  (draft: FilmState = initialState, action: FilmAction) => {
    switch (action.type) {
      case AT.RECEIVE_FILMS:
        draft = action.result.results;
    }
    return draft;
  }
);

export { filmAction, filmReducer, filmSelector };
