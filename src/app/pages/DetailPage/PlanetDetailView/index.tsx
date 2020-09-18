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
        <h1>{`Planet #${index + 1}`}</h1>

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
