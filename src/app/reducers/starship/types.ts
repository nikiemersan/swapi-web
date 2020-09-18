import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_STARSHIPS: null,
  RECEIVE_STARSHIPS: null,
});

export interface Starship {
  MGLT: string;
  cargoCapacity: string;
  consumables: string;
  costInCredits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdriveRating: string;
  length: string;
  manufacturer: string;
  maxAtmospheringSpeed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starshipClass: string;
  url: string;
}

export type StarshipState = Starship[];

export type ListStarships = ListItems<Starship>;

export interface RequestStarshipsAction
  extends ReduxPromiseAction<ListStarships> {
  type: typeof AT.REQUEST_STARSHIPS;
}

export interface ReceiveStarshipsAction
  extends ReduxPromiseAction<ListStarships> {
  type: typeof AT.RECEIVE_STARSHIPS;
  result: ListStarships;
}

export type StarshipAction = RequestStarshipsAction | ReceiveStarshipsAction;
