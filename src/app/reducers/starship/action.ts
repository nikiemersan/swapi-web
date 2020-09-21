import {
  AT,
  ListStarships,
  ReceiveStarshipsAction,
  RequestStarshipsAction,
  RequestStarshipsSuccessAction,
} from "./types";

export const requestStarships = (): RequestStarshipsAction => {
  return {
    type: AT.REQUEST_STARSHIPS,
  };
};

export const receiveStarships = (
  starships: ListStarships
): ReceiveStarshipsAction => {
  return {
    type: AT.RECEIVE_STARSHIPS,
    result: starships,
  };
};

export const requestStarshipsSuccess = (): RequestStarshipsSuccessAction => {
  return {
    type: AT.REQUEST_STARSHIPS_SUCCESS,
  };
};
