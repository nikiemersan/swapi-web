import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  starshipAction,
  starshipSelector,
} from "../../../../reducers/starship";
import { ListStarships, Starship } from "../../../../reducers/starship/types";

import { CONST_STARSHIPS } from "../../../../constants";
import { getFromSwapi } from "../../../../api";

import { getIndexesFromUrls } from "../../utils";

interface SectionPropTypes {
  urls: string[];
}

const StarshipSection = ({ urls }: SectionPropTypes): JSX.Element => {
  const dispatch = useDispatch();
  const indexes: number[] = getIndexesFromUrls(urls);

  const isLoaded: Boolean = useSelector(starshipSelector.isStarshipLoaded);
  const isLoading: Boolean = useSelector(starshipSelector.isStarshipLoading);
  const allStarships: Starship[] = useSelector(starshipSelector.getStarships);

  const selectedStarships: (
    | Starship
    | undefined
  )[] = indexes.map((index: number): Starship | undefined =>
    allStarships[index] ? allStarships[index] : undefined
  );

  useEffect(() => {
    const getAllStarships = async () => {
      dispatch(starshipAction.requestStarships());

      let shouldRequestData = true;
      let queryString = "";
      let res;
      while (shouldRequestData) {
        res = await getFromSwapi(`${CONST_STARSHIPS}/${queryString}`);
        dispatch(starshipAction.receiveStarships(res as ListStarships));

        if ("next" in res && res.next) {
          queryString = res.next.substring(res.next.indexOf("?"));
        } else {
          shouldRequestData = false;
        }
      }
      dispatch(starshipAction.requestStarshipsSuccess());
    };

    if (!isLoaded && !isLoading) {
      getAllStarships();
    }
  }, []);

  return selectedStarships.length === 0 ? (
    <p>-</p>
  ) : (
    <div>
      {selectedStarships.map(
        (starship: Starship | undefined, index: number): JSX.Element => (
          <span>
            {starship?.name}
            {index !== selectedStarships.length - 1 && ", "}
          </span>
        )
      )}
    </div>
  );
};

export default StarshipSection;
