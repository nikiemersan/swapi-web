import { CategoryState } from "./types";
import { RootState } from "../types";

export const getCategories = (state: RootState): CategoryState =>
  state.categories;
