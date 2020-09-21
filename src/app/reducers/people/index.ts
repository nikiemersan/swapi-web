import produce from "immer";

import * as peopleAction from "./action";
import * as peopleSelector from "./selectors";
import { AT, PeopleState, PeopleAction } from "./types";

export const initialState: PeopleState = {
  isLoaded: false,
  isLoading: false,
  items: [],
};

const peopleReducer = produce(
  (draft: PeopleState = initialState, action: PeopleAction) => {
    switch (action.type) {
      case AT.REQUEST_PEOPLE:
        draft.isLoading = true;
        break;
      case AT.RECEIVE_PEOPLE:
        draft.items = draft.items.concat(action.result.results);
        break;
      case AT.REQUEST_PEOPLE_SUCCESS:
        draft.isLoaded = true;
        draft.isLoading = false;
        break;
    }
    return draft;
  }
);

export { peopleAction, peopleReducer, peopleSelector };
