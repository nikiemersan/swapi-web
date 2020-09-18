import keyMirror from "keymirror";
import { ListItems, ReduxPromiseAction } from "../../types";

export const AT = keyMirror({
  REQUEST_SPECIES: null,
  RECEIVE_SPECIES: null,
});

export interface Species {
  averageHeight: string;
  averageLifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eyeColors: string;
  hairColors: string;
  homeworld: string;
  language: string;
  name: string;
  people: string[];
  films: string[];
  skinColors: string;
  url: string;
}

export type SpeciesState = Species[];

export type ListSpecies = ListItems<Species>;

export interface RequestSpeciesAction extends ReduxPromiseAction<ListSpecies> {
  type: typeof AT.REQUEST_SPECIES;
}

export interface ReceiveSpeciesAction extends ReduxPromiseAction<ListSpecies> {
  type: typeof AT.RECEIVE_SPECIES;
  result: ListSpecies;
}

export type SpeciesAction = RequestSpeciesAction | ReceiveSpeciesAction;
