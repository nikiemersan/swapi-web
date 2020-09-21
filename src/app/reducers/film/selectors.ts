import { Film } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getFilms = (state: RootState): Film[] => state.films.items;

export const getFilmById = (state: RootState, id: number): Film =>
  state.films.items[id] || emptyObject;

export const isFilmLoading = (state: RootState) => state.films.isLoading;

export const isFilmLoaded = (state: RootState) => state.films.isLoaded;
