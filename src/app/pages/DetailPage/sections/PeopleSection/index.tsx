import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { peopleAction, peopleSelector } from "../../../../reducers/people";
import { ListPeople, People } from "../../../../reducers/people/types";

import { CONST_PEOPLE } from "../../../../constants";
import { getFromSwapi } from "../../../../api";

import { getIndexesFromUrls } from "../../utils";

interface SectionPropTypes {
  urls: string[];
}

const PeopleSection = ({ urls }: SectionPropTypes): JSX.Element => {
  const dispatch = useDispatch();
  const indexes: number[] = getIndexesFromUrls(urls);

  const isLoaded: Boolean = useSelector(peopleSelector.isPeopleLoaded);
  const isLoading: Boolean = useSelector(peopleSelector.isPeopleLoading);
  const allPeople: People[] = useSelector(peopleSelector.getPeople);

  const selectedPeople: (People | undefined)[] = indexes.map((index: number):
    | People
    | undefined => (allPeople[index] ? allPeople[index] : undefined));

  useEffect(() => {
    const getAllPeople = async () => {
      dispatch(peopleAction.requestPeople());

      let shouldRequestData = true;
      let queryString = "";
      let res;
      while (shouldRequestData) {
        res = await getFromSwapi(`${CONST_PEOPLE}/${queryString}`);
        dispatch(peopleAction.receivePeople(res as ListPeople));

        if ("next" in res && res.next) {
          queryString = res.next.substring(res.next.indexOf("?"));
        } else {
          shouldRequestData = false;
        }
      }
      dispatch(peopleAction.requestPeopleSuccess());
    };

    if (!isLoaded && !isLoading) {
      getAllPeople();
    }
  }, []);

  return selectedPeople.length === 0 ? (
    <p>-</p>
  ) : (
    <div>
      {selectedPeople.map(
        (people: People | undefined, index: number): JSX.Element => (
          <span>
            {people?.name}
            {index !== selectedPeople.length - 1 && ", "}
          </span>
        )
      )}
    </div>
  );
};

export default PeopleSection;
