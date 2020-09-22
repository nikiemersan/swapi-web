import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Planet, ListPlanets } from "../../../reducers/planet/types";
import { planetAction, planetSelector } from "../../../reducers/planet";
import { RootState } from "../../../reducers/types";
import { isFirstItem, isLastItem } from "../utils";

import DarthVaderImage from "../../../assets/darth-vader.png";
import ArrowBack from "../../../assets/arrow-left.png";
import ArrowNext from "../../../assets/arrow-right.png";

import { CONST_PLANETS } from "../../../constants";
import { getFromSwapi } from "../../../api";
import LoadingPage from "../../LoadingPage";
import FilmSection from "../sections/FilmSection";
import PeopleSection from "../sections/PeopleSection";

interface Props {
  index: number;
}

const PlanetDetailView = (props: Props) => {
  const { index } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoaded: Boolean = useSelector(planetSelector.isPlanetLoaded);
  const isLoading: Boolean = useSelector(planetSelector.isPlanetLoading);
  const planet: Planet = useSelector((state: RootState) =>
    planetSelector.getPlanetById(state, index)
  );
  const planets: Planet[] = useSelector(planetSelector.getPlanets);

  useEffect(() => {
    const getAllPlanets = async () => {
      dispatch(planetAction.requestPlanets());

      let shouldRequestData = true;
      let queryString = "";
      let res;
      while (shouldRequestData) {
        res = await getFromSwapi(`${CONST_PLANETS}/${queryString}`);
        dispatch(planetAction.receivePlanets(res as ListPlanets));
        if ("next" in res && res.next) {
          queryString = res.next.substring(res.next.indexOf("?"));
        } else {
          shouldRequestData = false;
        }
      }
      dispatch(planetAction.requestPlanetsSuccess());
    };

    if (!isLoaded && !isLoading) {
      getAllPlanets();
    }
  }, []);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(planet, planets);
  const shouldShowPreviousButton = !isFirstItem(planet, planets);

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
        <h1 style={{ display: "inline-block" }}>{`Planet #${index + 1}`}</h1>
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

      <h3>Name</h3>
      <p>{planet.name}</p>
      <h3>Diameter</h3>
      <p>{planet.diameter}</p>
      <h3>Rotation Period</h3>
      <p>{planet.rotation_period}</p>
      <h3>Orbital Period</h3>
      <p>{planet.orbital_period}</p>
      <h3>Gravity</h3>
      <p>{planet.gravity}</p>
      <h3>Population</h3>
      <p>{planet.population}</p>
      <h3>Climate</h3>
      <p>{planet.climate}</p>
      <h3>Terrain</h3>
      <p>{planet.terrain}</p>
      <h3>Films</h3>
      <FilmSection urls={planet.films} />
      <h3>Residents</h3>
      <PeopleSection urls={planet.residents} />
    </div>
  );
};

export default PlanetDetailView;
