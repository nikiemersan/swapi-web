import {
  AT,
  ListVehicles,
  ReceiveVehiclesAction,
  RequestVehiclesAction,
  RequestVehiclesSuccessAction,
} from "./types";

export const requestVehicles = (): RequestVehiclesAction => {
  return {
    type: AT.REQUEST_VEHICLES,
  };
};

export const receiveVehicles = (
  vehicles: ListVehicles
): ReceiveVehiclesAction => {
  return {
    type: AT.RECEIVE_VEHICLES,
    result: vehicles,
  };
};

export const requestVehiclesSuccess = (): RequestVehiclesSuccessAction => {
  return {
    type: AT.REQUEST_VEHICLES_SUCCESS,
  };
};
