import keyMirror from "keymirror";
import { ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_CATEGORIES: null,
  RECEIVE_CATEGORIES: null,
});

export interface Category {
  films: string;
  people: string;
  planets: string;
  species: string;
  starships: string;
  vehicles: string;
}

export type CategoryState = string[];

export interface RequestCategoriesAction extends ReduxPromiseAction<Category> {
  type: typeof AT.REQUEST_CATEGORIES;
}

export interface ReceiveCategoriesAction extends ReduxPromiseAction<Category> {
  type: typeof AT.RECEIVE_CATEGORIES;
}

export type CategoryAction = RequestCategoriesAction | ReceiveCategoriesAction;
