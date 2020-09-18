import {
  AT,
  ListSpecies,
  ReceiveSpeciesAction,
  RequestSpeciesAction,
} from "./types";

export const requestSpecies = (): RequestSpeciesAction => {
  return {
    type: AT.REQUEST_SPECIES,
  };
};

export const receiveSpecies = (species: ListSpecies): ReceiveSpeciesAction => {
  return {
    type: AT.RECEIVE_SPECIES,
    result: species,
  };
};
