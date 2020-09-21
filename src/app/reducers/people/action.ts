import {
  AT,
  ListPeople,
  ReceivePeopleAction,
  RequestPeopleAction,
  RequestPeopleSuccessAction,
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

export const requestPeopleSuccess = (): RequestPeopleSuccessAction => {
  return {
    type: AT.REQUEST_PEOPLE_SUCCESS,
  };
};
