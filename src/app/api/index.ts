import { URL_SWAPI } from "../constants";
import { ApiResponse } from "./types";

export const getFromSwapi = async (path: string = ""): Promise<ApiResponse> => {
  const url = `${URL_SWAPI}${path}`;

  let result;

  try {
    result = await fetch(url);
  } catch (err) {
    console.log("[Error] getFromSwapi ->", err);
  }
  return result?.json();
};
