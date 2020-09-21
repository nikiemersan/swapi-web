import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ListStarships, Starship } from "../../../reducers/starship/types";
import { starshipAction, starshipSelector } from "../../../reducers/starship";
import { RootState } from "../../../reducers/types";
import { getFromSwapi } from "../../../api";
import { CONST_STARSHIPS } from "../../../constants";

import DarthVaderImage from "../../../assets/darth-vader.png";
import ArrowBack from "../../../assets/arrow-left.png";
import ArrowNext from "../../../assets/arrow-right.png";

import { isFirstItem, isLastItem } from "../utils";
import LoadingPage from "../../LoadingPage";
import FilmSection from "../sections/FilmSection";
import PeopleSection from "../sections/PeopleSection";

interface Props {
  index: number;
}

const StarshipDetailView = (props: Props) => {
  const { index } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoaded: Boolean = useSelector(starshipSelector.isStarshipLoaded);
  const isLoading: Boolean = useSelector(starshipSelector.isStarshipLoading);
  const starship: Starship = useSelector((state: RootState) =>
    starshipSelector.getStarshipById(state, index)
  );
  const starships: Starship[] = useSelector(starshipSelector.getStarships);

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

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(starship, starships);
  const shouldShowPreviousButton = !isFirstItem(starship, starships);

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
        <h1 style={{ display: "inline-block" }}>{`Starship #${index + 1}`}</h1>
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
      <p>{starship.name}</p>
      <h3>Model</h3>
      <p>{starship.model}</p>
      <h3>Starship Class</h3>
      <p>{starship.starship_class}</p>
      <h3>Manufacturer</h3>
      <p>{starship.manufacturer}</p>
      <h3>Cost in Credits</h3>
      <p>{starship.cost_in_credits}</p>
      <h3>Length</h3>
      <p>{starship.length}</p>
      <h3>Crew</h3>
      <p>{starship.crew}</p>
      <h3>Passengers</h3>
      <p>{starship.passengers}</p>
      <h3>Max Atmosphering Speed</h3>
      <p>{starship.max_atmosphering_speed}</p>
      <h3>Hyperdrive Rating</h3>
      <p>{starship.hyperdrive_rating}</p>
      <h3>MGLT</h3>
      <p>{starship.MGLT}</p>
      <h3>Cargo Capacity</h3>
      <p>{starship.cargo_capacity}</p>
      <h3>Consumables</h3>
      <p>{starship.consumables}</p>
      <h3>Films</h3>
      <FilmSection urls={starship.films} />
      <h3>Pilots</h3>
      <PeopleSection urls={starship.pilots} />
    </div>
  );
};

export default StarshipDetailView;
