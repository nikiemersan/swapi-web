import {
  AT,
  ListVehicles,
  ReceiveVehiclesAction,
  RequestVehiclesAction,
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
