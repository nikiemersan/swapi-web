import {
  AT,
  ListStarships,
  ReceiveStarshipsAction,
  RequestStarshipsAction,
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
