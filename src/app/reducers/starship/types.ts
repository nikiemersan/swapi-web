import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_STARSHIPS: null,
  RECEIVE_STARSHIPS: null,
  REQUEST_STARSHIPS_SUCCESS: null,
});

export interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
}

export interface StarshipState {
  isLoaded: Boolean;
  isLoading: Boolean;
  items: Starship[];
}

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

export interface RequestStarshipsSuccessAction
  extends ReduxPromiseAction<ListStarships> {
  type: typeof AT.REQUEST_STARSHIPS_SUCCESS;
}

export type StarshipAction =
  | RequestStarshipsAction
  | ReceiveStarshipsAction
  | RequestStarshipsSuccessAction;
