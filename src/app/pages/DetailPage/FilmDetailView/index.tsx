import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getFromSwapi } from "../../../api";

import { filmAction, filmSelector } from "../../../reducers/film";

import { Film, FilmState, ListFilms } from "../../../reducers/film/types";
import { RootState } from "../../../reducers/types";

import { CONST_FILMS } from "../../../constants";

import { isFirstItem, isLastItem } from "../utils";

interface Props {
  index: number;
}

const FilmDetailView = (props: Props) => {
  const { index } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const film: Film = useSelector((state: RootState) =>
    filmSelector.getFilmById(state, index)
  );
  const films: FilmState = useSelector(filmSelector.getFilms);
  console.log("FilmDetailView -> film", film);

  useEffect(() => {
    const getFilms = async () => {
      dispatch(filmAction.requestFilms());
      const res = await getFromSwapi(`${CONST_FILMS}/`);
      dispatch(filmAction.receiveFilms(res as ListFilms));
    };

    getFilms();
  }, []);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(film, films);
  const shouldShowPreviousButton = !isFirstItem(film, films);

  return (
    film && (
      <>
        <h1>{`Film #${index + 1}`}</h1>
        <h3>Title</h3>
        <p>{film.title}</p>
        <h3>Episode ID</h3>
        <p>{film.episode_id}</p>
        <h3>Opening Crawl</h3>
        <p>{film.opening_crawl}</p>
        <h3>Director</h3>
        <p>{film.director}</p>
        <h3>Producer</h3>
        <p>{film.producer}</p>
        <h3>Release Date</h3>
        <p>{film.release_date}</p>

        {shouldShowPreviousButton && (
          <button onClick={onPreviousButtonClick}>Previous</button>
        )}
        {shouldShowNextButton && (
          <button onClick={onNextButtonClick}>Next</button>
        )}
      </>
    )
  );
};

export default FilmDetailView;
