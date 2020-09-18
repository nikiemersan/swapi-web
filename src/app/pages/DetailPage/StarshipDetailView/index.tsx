import React from "react";
import { useSelector } from "react-redux";

import { Starship } from "../../../reducers/starship/types";
import { starshipSelector } from "../../../reducers/starship";
import { RootState } from "../../../reducers/types";

interface Props {
  index: number;
}

const StarshipDetailView = (props: Props) => {
  const { index } = props;

  const starship: Starship = useSelector((state: RootState) =>
    starshipSelector.getStarshipById(state, index)
  );
  console.log("StarshipDetailView -> starship", starship);

  return (
    starship && (
      <>
        <p>Name</p>
        <p>{starship.name}</p>
        <p>Model</p>
        <p>{starship.model}</p>
        <p>Starship Class</p>
        <p>{starship.starshipClass}</p>
        <p>Manufacturer</p>
        <p>{starship.manufacturer}</p>
        <p>Cost in Credits</p>
        <p>{starship.costInCredits}</p>
        <p>Length</p>
        <p>{starship.length}</p>
        <p>Crew</p>
        <p>{starship.crew}</p>
        <p>Passengers</p>
        <p>{starship.passengers}</p>
        <p>Max Atmosphering Speed</p>
        <p>{starship.maxAtmospheringSpeed}</p>
        <p>Hyperdrive Rating</p>
        <p>{starship.hyperdriveRating}</p>
        <p>MGLT</p>
        <p>{starship.MGLT}</p>
        <p>Cargo Capacity</p>
        <p>{starship.cargoCapacity}</p>
        <p>Consumables</p>
        <p>{starship.consumables}</p>
        <p>Created</p>
        <p>{starship.created}</p>
        <p>Edited</p>
        <p>{starship.edited}</p>
      </>
    )
  );
};

export default StarshipDetailView;
