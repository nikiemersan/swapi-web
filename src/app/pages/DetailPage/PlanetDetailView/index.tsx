import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Planet, PlanetState } from "../../../reducers/planet/types";
import { planetSelector } from "../../../reducers/planet";
import { RootState } from "../../../reducers/types";
import { isFirstItem, isLastItem } from "../utils";

interface Props {
  index: number;
}

const PlanetDetailView = (props: Props) => {
  const { index } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const planet: Planet = useSelector((state: RootState) =>
    planetSelector.getPlanetById(state, index)
  );
  const planets: PlanetState = useSelector(planetSelector.getPlanets);
  console.log("PlanetDetailView -> planet", planet);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(planet, planets);
  const shouldShowPreviousButton = !isFirstItem(planet, planets);

  return (
    planet && (
      <>
        <h1>{`Film #${index + 1}`}</h1>

        <h3>Name</h3>
        <p>{planet.name}</p>
        <h3>Diameter</h3>
        <p>{planet.diameter}</p>
        <h3>Rotation Period</h3>
        <p>{planet.rotation_period}</p>
        <p>Orbital Period</p>
        <p>{planet.orbital_period}</p>
        <p>Gravity</p>
        <p>{planet.gravity}</p>
        <p>Population</p>
        <p>{planet.population}</p>
        <p>Climate</p>
        <p>{planet.climate}</p>
        <p>Terrain</p>
        <p>{planet.terrain}</p>
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

export default PlanetDetailView;
