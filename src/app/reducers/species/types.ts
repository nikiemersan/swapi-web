import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_SPECIES: null,
  RECEIVE_SPECIES: null,
  REQUEST_SPECIES_SUCCESS: null,
});

export interface Species {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string;
  language: string;
  name: string;
  people: string[];
  films: string[];
  skin_colors: string;
  url: string;
}

export interface SpeciesState {
  isLoaded: Boolean;
  isLoading: Boolean;
  items: Species[];
}

export type ListSpecies = ListItems<Species>;

export interface RequestSpeciesAction extends ReduxPromiseAction<ListSpecies> {
  type: typeof AT.REQUEST_SPECIES;
}

export interface ReceiveSpeciesAction extends ReduxPromiseAction<ListSpecies> {
  type: typeof AT.RECEIVE_SPECIES;
  result: ListSpecies;
}

export interface RequestSpeciesSuccessAction
  extends ReduxPromiseAction<ListSpecies> {
  type: typeof AT.REQUEST_SPECIES_SUCCESS;
}

export type SpeciesAction =
  | RequestSpeciesAction
  | ReceiveSpeciesAction
  | RequestSpeciesSuccessAction;
