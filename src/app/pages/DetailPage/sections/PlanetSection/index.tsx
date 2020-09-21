import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { planetAction, planetSelector } from "../../../../reducers/planet";
import { ListPlanets, Planet } from "../../../../reducers/planet/types";

import { CONST_PLANETS } from "../../../../constants";
import { getFromSwapi } from "../../../../api";

import { getIndexesFromUrls } from "../../utils";

interface SectionPropTypes {
  urls: string[];
}

const PlanetSection = ({ urls }: SectionPropTypes): JSX.Element => {
  const dispatch = useDispatch();
  const indexes: number[] = getIndexesFromUrls(urls);

  const isLoaded: Boolean = useSelector(planetSelector.isPlanetLoaded);
  const isLoading: Boolean = useSelector(planetSelector.isPlanetLoading);
  const allPlanets: Planet[] = useSelector(planetSelector.getPlanets);

  const selectedPlanets: (Planet | undefined)[] = indexes.map((index: number):
    | Planet
    | undefined => (allPlanets[index] ? allPlanets[index] : undefined));

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

  return selectedPlanets.length === 0 ? (
    <p>-</p>
  ) : (
    <>
      {selectedPlanets.map(
        (planet: Planet | undefined, index: number): JSX.Element => (
          <span>
            {planet?.name}
            {index !== selectedPlanets.length - 1 && ", "}
          </span>
        )
      )}
    </>
  );
};

export default PlanetSection;
