import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ListPeople, People } from "../../../reducers/people/types";
import { peopleAction, peopleSelector } from "../../../reducers/people";
import { RootState } from "../../../reducers/types";
import { getFromSwapi } from "../../../api";
import { CONST_PEOPLE } from "../../../constants";
import { isFirstItem, isLastItem } from "../utils";

import DarthVaderImage from "../../../assets/darth-vader.png";
import ArrowBack from "../../../assets/arrow-left.png";
import ArrowNext from "../../../assets/arrow-right.png";

import LoadingPage from "../../LoadingPage";
import PlanetSection from "../sections/PlanetSection";
import FilmSection from "../sections/FilmSection";
import SpeciesSection from "../sections/SpeciesSection";
import StarshipSection from "../sections/StarshipSection";
import VehicleSection from "../sections/VehicleSection";

interface Props {
  index: number;
}

const PeopleDetailView = (props: Props) => {
  const { index } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoaded: Boolean = useSelector(peopleSelector.isPeopleLoaded);
  const isLoading: Boolean = useSelector(peopleSelector.isPeopleLoading);

  const people: People = useSelector((state: RootState) =>
    peopleSelector.getPeopleById(state, index)
  );
  const allPeople: People[] = useSelector(peopleSelector.getPeople);

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

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(people, allPeople);
  const shouldShowPreviousButton = !isFirstItem(people, allPeople);

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
        <h1 style={{ display: "inline-block" }}>{`People #${index + 1}`}</h1>
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
      </div>
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
      <PlanetSection urls={Array(people.homeworld)} />
      <h3>Films</h3>
      <FilmSection urls={people.films} />
      <h3>Species</h3>
      <SpeciesSection urls={people.species} />
      <h3>Starships</h3>
      <StarshipSection urls={people.starships} />
      <h3>Vehicles</h3>
      <VehicleSection urls={people.vehicles} />
    </div>
  );
};

export default PeopleDetailView;
