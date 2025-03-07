import {
  AT,
  Category,
  ReceiveCategoriesAction,
  RequestCategoriesAction,
  RequestCategoriesSuccessAction,
} from "./types";

export const requestCategories = (): RequestCategoriesAction => {
  return {
    type: AT.REQUEST_CATEGORIES,
  };
};

export const receiveCategories = (
  category: Category
): ReceiveCategoriesAction => {
  return {
    type: AT.RECEIVE_CATEGORIES,
    result: category,
  };
};

export const requestCategoriesSuccess = (): RequestCategoriesSuccessAction => {
  return {
    type: AT.REQUEST_CATEGORIES_SUCCESS,
  };
};
