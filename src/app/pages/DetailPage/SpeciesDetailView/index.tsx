import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ListSpecies, Species } from "../../../reducers/species/types";
import { speciesAction, speciesSelector } from "../../../reducers/species";
import { RootState } from "../../../reducers/types";

import { isFirstItem, isLastItem } from "../utils";

import DarthVaderImage from "../../../assets/darth-vader.png";
import ArrowBack from "../../../assets/arrow-left.png";
import ArrowNext from "../../../assets/arrow-right.png";

import { CONST_SPECIES } from "../../../constants";
import { getFromSwapi } from "../../../api";
import LoadingPage from "../../LoadingPage";
import PeopleSection from "../sections/PeopleSection";
import FilmSection from "../sections/FilmSection";

interface Props {
  index: number;
}

const SpeciesDetailView = (props: Props) => {
  const { index } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoaded: Boolean = useSelector(speciesSelector.isSpeciesLoaded);
  const isLoading: Boolean = useSelector(speciesSelector.isSpeciesLoading);
  const species: Species = useSelector((state: RootState) =>
    speciesSelector.getSpeciesById(state, index)
  );
  const allSpecies: Species[] = useSelector(speciesSelector.getSpecies);

  useEffect(() => {
    const getAllSpecies = async () => {
      dispatch(speciesAction.requestSpecies());

      let shouldRequestData = true;
      let queryString = "";
      let res;
      while (shouldRequestData) {
        res = await getFromSwapi(`${CONST_SPECIES}/${queryString}`);
        dispatch(speciesAction.receiveSpecies(res as ListSpecies));

        if ("next" in res && res.next) {
          queryString = res.next.substring(res.next.indexOf("?"));
        } else {
          shouldRequestData = false;
        }
      }
      dispatch(speciesAction.requestSpeciesSuccess());
    };

    if (!isLoaded && !isLoading) {
      getAllSpecies();
    }
  }, []);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(species, allSpecies);
  const shouldShowPreviousButton = !isFirstItem(species, allSpecies);

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
        <h1 style={{ display: "inline-block" }}>{`Species #${index + 1}`}</h1>
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
      </div>{" "}
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
      <h3>People</h3>
      <PeopleSection urls={species.people} />
      <h3>Films</h3>
      <FilmSection urls={species.films} />
    </div>
  );
};

export default SpeciesDetailView;
