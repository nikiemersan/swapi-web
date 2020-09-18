import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  ListPeople,
  People,
  PeopleState,
} from "../../../reducers/people/types";
import { peopleAction, peopleSelector } from "../../../reducers/people";
import { RootState } from "../../../reducers/types";
import { getFromSwapi } from "../../../api";
import { CONST_PEOPLE } from "../../../constants";
import { isFirstItem, isLastItem } from "../utils";

interface Props {
  index: number;
}

const PeopleDetailView = (props: Props) => {
  const { index } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const people: People = useSelector((state: RootState) =>
    peopleSelector.getPeopleById(state, index)
  );
  const allPeople: PeopleState = useSelector(peopleSelector.getPeople);
  console.log("PeopleDetailView -> people", people);

  useEffect(() => {
    const getPeople = async () => {
      dispatch(peopleAction.requestPeople());
      const res = await getFromSwapi(`${CONST_PEOPLE}/`);
      dispatch(peopleAction.receivePeople(res as ListPeople));
    };

    getPeople();
  }, []);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(people, allPeople);
  const shouldShowPreviousButton = !isFirstItem(people, allPeople);

  return (
    people && (
      <>
        <h1>{`People #${index + 1}`}</h1>
        <h3>Name</h3>
        <p>{people.name}</p>
        <h3>Birth Year</h3>
        <p>{people.birth_year}</p>
        <h3>Eye Color</h3>
        <p>{people.eye_color}</p>
        <h3>Gender</h3>
        <p>{people.gender}</p>
        <h3>Hair Color</h3>
        <p>{people.hair_color}</p>
        <h3>Height</h3>
        <p>{people.height}</p>
        <h3>Mass</h3>
        <p>{people.mass}</p>
        <h3>Skin Color</h3>
        <p>{people.skin_color}</p>
        <h3>Homeworld</h3>
        <p>{people.homeworld}</p>
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

export default PeopleDetailView;
