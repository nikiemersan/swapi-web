import produce from "immer";

import * as vehicleAction from "./action";
import * as vehicleSelector from "./selectors";
import { AT, VehicleState, VehicleAction } from "./types";

export const initialState: VehicleState = {
  isLoaded: false,
  isLoading: false,
  items: [],
};

const vehicleReducer = produce(
  (draft: VehicleState = initialState, action: VehicleAction) => {
    switch (action.type) {
      case AT.REQUEST_VEHICLES:
        draft.isLoading = true;
        break;
      case AT.RECEIVE_VEHICLES:
        draft.items = draft.items.concat(action.result.results);
        break;
      case AT.REQUEST_VEHICLES_SUCCESS:
        draft.isLoaded = true;
        draft.isLoading = false;
        break;
    }
    return draft;
  }
);

export { vehicleAction, vehicleReducer, vehicleSelector };
