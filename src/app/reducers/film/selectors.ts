import { Film, FilmState } from "./types";
import { RootState } from "../types";

export const emptyObject: Object = {};

export const getFilms = (state: RootState): FilmState => state.films;

export const getFilmById = (state: RootState, id: number): Film =>
  state.films[id] || emptyObject;
