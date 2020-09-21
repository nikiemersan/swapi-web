import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getFromSwapi } from "../../../api";

import { filmAction, filmSelector } from "../../../reducers/film";

import { Film, ListFilms } from "../../../reducers/film/types";
import { RootState } from "../../../reducers/types";

import { CONST_FILMS } from "../../../constants";

import { isFirstItem, isLastItem } from "../utils";

import DarthVaderImage from "../../../assets/darth-vader.png";
import ArrowBack from "../../../assets/arrow-left.png";
import ArrowNext from "../../../assets/arrow-right.png";

import PeopleSection from "../sections/PeopleSection";
import PlanetSection from "../sections/PlanetSection";
import SpeciesSection from "../sections/SpeciesSection";
import StarshipSection from "../sections/StarshipSection";
import LoadingPage from "../../LoadingPage";

interface Props {
  index: number;
}

const FilmDetailView = (props: Props) => {
  const { index } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoaded = useSelector(filmSelector.isFilmLoaded);
  const isLoading = useSelector(filmSelector.isFilmLoading);
  const film: Film = useSelector((state: RootState) =>
    filmSelector.getFilmById(state, index)
  );
  const films: Film[] = useSelector(filmSelector.getFilms);

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

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(film, films);
  const shouldShowPreviousButton = !isFirstItem(film, films);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div style={{ padding: 32, textAlign: "center" }}>
      <img src={DarthVaderImage} alt={""} style={{ height: 160, width: 160 }} />
      <div>
        {shouldShowPreviousButton && (
          <img
            src={ArrowBack}
            onClick={onPreviousButtonClick}
            style={{
              display: "inline-block",
              height: 24,
              width: 24,
              marginRight: 24,
            }}
          />
        )}
        <h1 style={{ display: "inline-block" }}>{`Film #${index + 1}`}</h1>
        {shouldShowNextButton && (
          <img
            src={ArrowNext}
            onClick={onNextButtonClick}
            style={{
              display: "inline-block",
              height: 24,
              width: 24,
              marginLeft: 24,
            }}
          />
        )}
      </div>
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
      <h3>Characters</h3>
      <PeopleSection urls={film.characters} />
      <h3>Planets</h3>
      <PlanetSection urls={film.planets} />
      <h3>Species</h3>
      <SpeciesSection urls={film.species} />
      <h3>Starships</h3>
      <StarshipSection urls={film.starships} />
    </div>
  );
};

export default FilmDetailView;
