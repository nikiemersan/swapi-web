import {
  AT,
  ListPeople,
  ReceivePeopleAction,
  RequestPeopleAction,
} from "./types";

export const requestPeople = (): RequestPeopleAction => {
  return {
    type: AT.REQUEST_PEOPLE,
  };
};

export const receivePeople = (people: ListPeople): ReceivePeopleAction => {
  return {
    type: AT.RECEIVE_PEOPLE,
    result: people,
  };
};
