import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_PEOPLE: null,
  RECEIVE_PEOPLE: null,
  REQUEST_PEOPLE_SUCCESS: null,
});

export interface People {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface PeopleState {
  isLoaded: Boolean;
  isLoading: Boolean;
  items: People[];
}

export type ListPeople = ListItems<People>;

export interface RequestPeopleAction extends ReduxPromiseAction<ListPeople> {
  type: typeof AT.REQUEST_PEOPLE;
}

export interface ReceivePeopleAction extends ReduxPromiseAction<ListPeople> {
  type: typeof AT.RECEIVE_PEOPLE;
  result: ListPeople;
}

export interface RequestPeopleSuccessAction
  extends ReduxPromiseAction<ListPeople> {
  type: typeof AT.REQUEST_PEOPLE_SUCCESS;
}

export type PeopleAction =
  | RequestPeopleAction
  | ReceivePeopleAction
  | RequestPeopleSuccessAction;
