import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  ListStarships,
  Starship,
  StarshipState,
} from "../../../reducers/starship/types";
import { starshipAction, starshipSelector } from "../../../reducers/starship";
import { RootState } from "../../../reducers/types";
import { getFromSwapi } from "../../../api";
import { CONST_STARSHIPS } from "../../../constants";

import { isFirstItem, isLastItem } from "../utils";

interface Props {
  index: number;
}

const StarshipDetailView = (props: Props) => {
  const { index } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const starship: Starship = useSelector((state: RootState) =>
    starshipSelector.getStarshipById(state, index)
  );
  const starships: StarshipState = useSelector(starshipSelector.getStarships);
  console.log("StarshipDetailView -> starship", starship);

  useEffect(() => {
    const getStarships = async () => {
      dispatch(starshipAction.requestStarships());
      const res = await getFromSwapi(`${CONST_STARSHIPS}/`);
      dispatch(starshipAction.receiveStarships(res as ListStarships));
    };

    getStarships();
  }, []);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(starship, starships);
  const shouldShowPreviousButton = !isFirstItem(starship, starships);

  return (
    starship && (
      <>
        <h1>{`Starship #${index + 1}`}</h1>

        <h3>Name</h3>
        <p>{starship.name}</p>
        <h3>Model</h3>
        <p>{starship.model}</p>
        <h3>Starship Class</h3>
        <p>{starship.starship_class}</p>
        <h3>Manufacturer</h3>
        <p>{starship.manufacturer}</p>
        <h3>Cost in Credits</h3>
        <p>{starship.cost_in_credits}</p>
        <h3>Length</h3>
        <p>{starship.length}</p>
        <h3>Crew</h3>
        <p>{starship.crew}</p>
        <h3>Passengers</h3>
        <p>{starship.passengers}</p>
        <h3>Max Atmosphering Speed</h3>
        <p>{starship.max_atmosphering_speed}</p>
        <h3>Hyperdrive Rating</h3>
        <p>{starship.hyperdrive_rating}</p>
        <h3>MGLT</h3>
        <p>{starship.MGLT}</p>
        <h3>Cargo Capacity</h3>
        <p>{starship.cargo_capacity}</p>
        <h3>Consumables</h3>
        <p>{starship.consumables}</p>
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

export default StarshipDetailView;
