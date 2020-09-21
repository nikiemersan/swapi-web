import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_FILMS: null,
  RECEIVE_FILMS: null,
  REQUEST_FILMS_SUCCESS: null,
});

export interface Film {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string;
}

export interface FilmState {
  isLoaded: Boolean;
  isLoading: Boolean;
  items: Film[];
}

export type ListFilms = ListItems<Film>;

export interface RequestFilmsAction extends ReduxPromiseAction<ListFilms> {
  type: typeof AT.REQUEST_FILMS;
}

export interface ReceiveFilmsAction extends ReduxPromiseAction<ListFilms> {
  type: typeof AT.RECEIVE_FILMS;
  result: ListFilms;
}

export interface RequestFilmsSuccessAction
  extends ReduxPromiseAction<ListFilms> {
  type: typeof AT.REQUEST_FILMS_SUCCESS;
}

export type FilmAction =
  | RequestFilmsAction
  | ReceiveFilmsAction
  | RequestFilmsSuccessAction;
