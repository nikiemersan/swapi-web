import produce from "immer";

import * as speciesAction from "./action";
import * as speciesSelector from "./selectors";
import { AT, SpeciesState, SpeciesAction } from "./types";

export const initialState: SpeciesState = {
  isLoaded: false,
  isLoading: false,
  items: [],
};

const speciesReducer = produce(
  (draft: SpeciesState = initialState, action: SpeciesAction) => {
    switch (action.type) {
      case AT.REQUEST_SPECIES:
        draft.isLoading = true;
        break;
      case AT.RECEIVE_SPECIES:
        draft.items = draft.items.concat(action.result.results);
        break;
      case AT.REQUEST_SPECIES_SUCCESS:
        draft.isLoaded = true;
        draft.isLoading = false;
        break;
    }
    return draft;
  }
);

export { speciesAction, speciesReducer, speciesSelector };
