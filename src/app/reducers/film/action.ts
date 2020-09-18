import { AT, ListFilms, ReceiveFilmsAction, RequestFilmsAction } from "./types";

export const requestFilms = (): RequestFilmsAction => {
  return {
    type: AT.REQUEST_FILMS,
  };
};

export const receiveFilms = (films: ListFilms): ReceiveFilmsAction => {
  return {
    type: AT.RECEIVE_FILMS,
    result: films,
  };
};
