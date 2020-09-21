import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_VEHICLES: null,
  RECEIVE_VEHICLES: null,
  REQUEST_VEHICLES_SUCCESS: null,
});

export interface Vehicle {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  url: string;
  vehicle_class: string;
}

export interface VehicleState {
  isLoaded: Boolean;
  isLoading: Boolean;
  items: Vehicle[];
}

export type ListVehicles = ListItems<Vehicle>;

export interface RequestVehiclesAction
  extends ReduxPromiseAction<ListVehicles> {
  type: typeof AT.REQUEST_VEHICLES;
}

export interface ReceiveVehiclesAction
  extends ReduxPromiseAction<ListVehicles> {
  type: typeof AT.RECEIVE_VEHICLES;
  result: ListVehicles;
}

export interface RequestVehiclesSuccessAction
  extends ReduxPromiseAction<ListVehicles> {
  type: typeof AT.REQUEST_VEHICLES_SUCCESS;
}

export type VehicleAction =
  | RequestVehiclesAction
  | ReceiveVehiclesAction
  | RequestVehiclesSuccessAction;
