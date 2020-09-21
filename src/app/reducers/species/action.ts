import {
  AT,
  ListSpecies,
  ReceiveSpeciesAction,
  RequestSpeciesAction,
  RequestSpeciesSuccessAction,
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

export const requestSpeciesSuccess = (): RequestSpeciesSuccessAction => {
  return {
    type: AT.REQUEST_SPECIES_SUCCESS,
  };
};
