import produce from "immer";

import * as vehicleAction from "./action";
import * as vehicleSelector from "./selectors";
import { AT, VehicleState, VehicleAction } from "./types";

export const initialState: VehicleState = [];

const vehicleReducer = produce(
  (draft: VehicleState = initialState, action: VehicleAction) => {
    switch (action.type) {
      case AT.RECEIVE_VEHICLES:
        draft = action.result.results;
    }
    return draft;
  }
);

export { vehicleAction, vehicleReducer, vehicleSelector };
