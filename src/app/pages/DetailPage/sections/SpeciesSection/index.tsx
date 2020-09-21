import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { speciesAction, speciesSelector } from "../../../../reducers/species";
import { ListSpecies, Species } from "../../../../reducers/species/types";

import { CONST_SPECIES } from "../../../../constants";
import { getFromSwapi } from "../../../../api";

import { getIndexesFromUrls } from "../../utils";

interface SectionPropTypes {
  urls: string[];
}

const SpeciesSection = ({ urls }: SectionPropTypes): JSX.Element => {
  const dispatch = useDispatch();
  const indexes: number[] = getIndexesFromUrls(urls);

  const isLoaded: Boolean = useSelector(speciesSelector.isSpeciesLoaded);
  const isLoading: Boolean = useSelector(speciesSelector.isSpeciesLoading);
  const allSpecies: Species[] = useSelector(speciesSelector.getSpecies);

  const selectedSpecies: (Species | undefined)[] = indexes.map((index: number):
    | Species
    | undefined => (allSpecies[index] ? allSpecies[index] : undefined));

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

  return selectedSpecies.length === 0 ? (
    <p>-</p>
  ) : (
    <div>
      {selectedSpecies.map(
        (species: Species | undefined, index: number): JSX.Element => (
          <span>
            {species?.name}
            {index !== selectedSpecies.length - 1 && ", "}
          </span>
        )
      )}
    </div>
  );
};

export default SpeciesSection;
