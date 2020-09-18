import produce from "immer";

import * as peopleAction from "./action";
import * as peopleSelector from "./selectors";
import { AT, PeopleState, PeopleAction } from "./types";

export const initialState: PeopleState = [];

const peopleReducer = produce(
  (draft: PeopleState = initialState, action: PeopleAction) => {
    switch (action.type) {
      case AT.RECEIVE_PEOPLE:
        draft = action.result.results;
    }
    return draft;
  }
);

export { peopleAction, peopleReducer, peopleSelector };
