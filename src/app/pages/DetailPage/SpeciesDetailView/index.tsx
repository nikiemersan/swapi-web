import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ListSpecies,
  Species,
  SpeciesState,
} from "../../../reducers/species/types";
import { speciesAction, speciesSelector } from "../../../reducers/species";
import { RootState } from "../../../reducers/types";

import { isFirstItem, isLastItem } from "../utils";
import { CONST_SPECIES } from "../../../constants";
import { getFromSwapi } from "../../../api";

interface Props {
  index: number;
}

const SpeciesDetailView = (props: Props) => {
  const { index } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const species: Species = useSelector((state: RootState) =>
    speciesSelector.getSpeciesById(state, index)
  );
  const allSpecies: SpeciesState = useSelector(speciesSelector.getSpecies);

  useEffect(() => {
    const getFilms = async () => {
      dispatch(speciesAction.requestSpecies());
      const res = await getFromSwapi(`${CONST_SPECIES}/`);
      dispatch(speciesAction.receiveSpecies(res as ListSpecies));
    };

    getFilms();
  }, []);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(species, allSpecies);
  const shouldShowPreviousButton = !isFirstItem(species, allSpecies);

  return (
    species && (
      <>
        <h1>{`Species #${index + 1}`}</h1>
        <h3>Name</h3>
        <p>{species.name}</p>
        <h3>Classification</h3>
        <p>{species.classification}</p>
        <h3>Designation</h3>
        <p>{species.designation}</p>
        <h3>Average Height</h3>
        <p>{species.average_height}</p>
        <h3>Average Lifespan</h3>
        <p>{species.average_lifespan}</p>
        <h3>Eye Colors</h3>
        <p>{species.eye_colors}</p>
        <h3>Hair Colors</h3>
        <p>{species.hair_colors}</p>
        <h3>Skin Colors</h3>
        <p>{species.skin_colors}</p>
        <h3>Language</h3>
        <p>{species.language}</p>
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

export default SpeciesDetailView;
