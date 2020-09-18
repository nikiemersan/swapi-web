import React from "react";
import { useSelector } from "react-redux";

import { Species } from "../../../reducers/species/types";
import { speciesSelector } from "../../../reducers/species";
import { RootState } from "../../../reducers/types";

interface Props {
  index: number;
}

const SpeciesDetailView = (props: Props) => {
  const { index } = props;

  const species: Species = useSelector((state: RootState) =>
    speciesSelector.getSpeciesById(state, index)
  );
  console.log("SpeciesDetailView -> species", species);

  return (
    species && (
      <>
        <p>Name</p>
        <p>{species.name}</p>
        <p>Classification</p>
        <p>{species.classification}</p>
        <p>Designation</p>
        <p>{species.designation}</p>
        <p>Average Height</p>
        <p>{species.averageHeight}</p>
        <p>Average Lifespan</p>
        <p>{species.averageLifespan}</p>
        <p>Eye Colors</p>
        <p>{species.eyeColors}</p>
        <p>Hair Colors</p>
        <p>{species.hairColors}</p>
        <p>Skin Colors</p>
        <p>{species.skinColors}</p>
        <p>Language</p>
        <p>{species.language}</p>
        <p>Homeworld</p>
        <p>{species.homeworld}</p>
        <p>Created</p>
        <p>{species.created}</p>
        <p>Edited</p>
        <p>{species.edited}</p>
      </>
    )
  );
};

export default SpeciesDetailView;
