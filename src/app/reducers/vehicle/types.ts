import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_VEHICLES: null,
  RECEIVE_VEHICLES: null,
});

export interface Vehicle {
  cargoCapacity: string;
  consumables: string;
  costInCredits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  maxAtmospheringSpeed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  url: string;
  vehicleClass: string;
}

export type VehicleState = Vehicle[];

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

export type VehicleAction = RequestVehiclesAction | ReceiveVehiclesAction;
