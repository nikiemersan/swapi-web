import { combineReducers } from "redux";

import { categoryReducer } from "./category";
import { filmReducer } from "./film";
import { peopleReducer } from "./people";
import { planetReducer } from "./planet";
import { speciesReducer } from "./species";
import { starshipReducer } from "./starship";
import { vehicleReducer } from "./vehicle";

import { RootState } from "./types";

const rootReducer = combineReducers<RootState>({
  categories: categoryReducer,
  films: filmReducer,
  people: peopleReducer,
  planets: planetReducer,
  species: speciesReducer,
  starships: starshipReducer,
  vehicles: vehicleReducer,
});

export default rootReducer;
