import produce from "immer";

import * as categoryAction from "./action";
import * as categorySelector from "./selectors";
import { AT, CategoryAction, Category, CategoryState } from "./types";

export const initialState: CategoryState = [];

const categoryReducer = produce(
  (draft: CategoryState = initialState, action: CategoryAction) => {
    console.log("action", action);
    switch (action.type) {
      case AT.REQUEST_CATEGORIES:
        console.log("REQUEST_CATEGORIES", action);
        break;
      case AT.RECEIVE_CATEGORIES:
        Object.keys(action.result as Category).forEach((key) =>
          draft.push(key)
        );
        break;
    }
    return draft;
  }
);

export { categoryAction, categoryReducer, categorySelector };
