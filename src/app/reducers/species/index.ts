import produce from "immer";

import * as speciesAction from "./action";
import * as speciesSelector from "./selectors";
import { AT, SpeciesState, SpeciesAction } from "./types";

export const initialState: SpeciesState = [];

const speciesReducer = produce(
  (draft: SpeciesState = initialState, action: SpeciesAction) => {
    switch (action.type) {
      case AT.RECEIVE_SPECIES:
        draft = action.result.results;
    }
    return draft;
  }
);

export { speciesAction, speciesReducer, speciesSelector };
