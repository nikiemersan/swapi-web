import { RootState } from "../types";

export const getCategories = (state: RootState): string[] =>
  state.categories.items;

export const isCategoryLoading = (state: RootState) =>
  state.categories.isLoading;

export const isCategoryLoaded = (state: RootState) => state.categories.isLoaded;
