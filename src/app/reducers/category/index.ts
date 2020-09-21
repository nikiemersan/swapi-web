import produce from "immer";

import * as categoryAction from "./action";
import * as categorySelector from "./selectors";
import { AT, CategoryAction, Category, CategoryState } from "./types";

export const initialState: CategoryState = {
  isLoaded: false,
  isLoading: false,
  items: [],
};

const categoryReducer = produce(
  (draft: CategoryState = initialState, action: CategoryAction) => {
    switch (action.type) {
      case AT.REQUEST_CATEGORIES:
        draft.isLoading = true;
        break;
      case AT.RECEIVE_CATEGORIES:
        Object.keys(action.result as Category).forEach((key) =>
          draft.items.push(key)
        );
        break;
      case AT.REQUEST_CATEGORIES_SUCCESS:
        draft.isLoaded = true;
        draft.isLoading = false;
        break;
    }
    return draft;
  }
);

export { categoryAction, categoryReducer, categorySelector };
