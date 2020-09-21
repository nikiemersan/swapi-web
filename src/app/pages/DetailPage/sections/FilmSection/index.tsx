import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filmAction, filmSelector } from "../../../../reducers/film";
import { ListFilms, Film } from "../../../../reducers/film/types";

import { CONST_FILMS } from "../../../../constants";
import { getFromSwapi } from "../../../../api";

import { getIndexesFromUrls } from "../../utils";

interface SectionPropTypes {
  urls: string[];
}

const FilmSection = ({ urls }: SectionPropTypes): JSX.Element => {
  const dispatch = useDispatch();
  const indexes: number[] = getIndexesFromUrls(urls);

  const isLoaded: Boolean = useSelector(filmSelector.isFilmLoaded);
  const isLoading: Boolean = useSelector(filmSelector.isFilmLoading);
  const allFilms: Film[] = useSelector(filmSelector.getFilms);

  const selectedFilms: (Film | undefined)[] = indexes.map((index: number):
    | Film
    | undefined => (allFilms[index] ? allFilms[index] : undefined));

  useEffect(() => {
    const getAllFilms = async () => {
      dispatch(filmAction.requestFilms());

      let shouldRequestData = true;
      let queryString = "";
      let res;
      while (shouldRequestData) {
        res = await getFromSwapi(`${CONST_FILMS}/${queryString}`);
        dispatch(filmAction.receiveFilms(res as ListFilms));

        if ("next" in res && res.next) {
          queryString = res.next.substring(res.next.indexOf("?"));
        } else {
          shouldRequestData = false;
        }
      }
      dispatch(filmAction.requestFilmsSuccess());
    };

    if (!isLoaded && !isLoading) {
      getAllFilms();
    }
  }, []);

  return selectedFilms.length === 0 ? (
    <p>-</p>
  ) : (
    <div>
      {selectedFilms.map(
        (film: Film | undefined, index: number): JSX.Element => (
          <span>
            {film?.title} {index !== selectedFilms.length - 1 && ", "}
          </span>
        )
      )}
    </div>
  );
};

export default FilmSection;
