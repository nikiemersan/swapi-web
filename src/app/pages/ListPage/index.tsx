import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import DarthVaderImage from "../../assets/darth-vader.png";

import { getFromSwapi } from "../../api";

import { filmAction, filmSelector } from "../../reducers/film";
import { peopleAction, peopleSelector } from "../../reducers/people";
import { planetAction, planetSelector } from "../../reducers/planet";
import { speciesAction, speciesSelector } from "../../reducers/species";
import { starshipAction, starshipSelector } from "../../reducers/starship";
import { vehicleAction, vehicleSelector } from "../../reducers/vehicle";

import { ListFilms } from "../../reducers/film/types";
import { ListPeople } from "../../reducers/people/types";
import { ListPlanets } from "../../reducers/planet/types";
import { ListSpecies } from "../../reducers/species/types";
import { ListStarships } from "../../reducers/starship/types";
import { ListVehicles } from "../../reducers/vehicle/types";

import {
  ListParamTypes,
  ActionByCategoryTypes,
  AvailableCategoryTypes,
} from "./types";

import {
  CONST_FILMS,
  CONST_PEOPLE,
  CONST_PLANETS,
  CONST_SPECIES,
  CONST_STARSHIPS,
  CONST_VEHICLES,
} from "../../constants";

import { ReduxPromiseAction } from "../../types";

const actionByCategory: ActionByCategoryTypes = {
  [CONST_FILMS]: {
    request: filmAction.requestFilms,
    receive: (films) =>
      filmAction.receiveFilms(films as ListFilms) as ReduxPromiseAction<
        ListFilms
      >,
    get: filmSelector.getFilms,
  },
  [CONST_PEOPLE]: {
    request: peopleAction.requestPeople,
    receive: (people) =>
      peopleAction.receivePeople(people as ListPeople) as ReduxPromiseAction<
        ListPeople
      >,
    get: peopleSelector.getPeople,
  },
  [CONST_PLANETS]: {
    request: planetAction.requestPlanets,
    receive: (planet) =>
      planetAction.receivePlanets(planet as ListPlanets) as ReduxPromiseAction<
        ListPlanets
      >,
    get: planetSelector.getPlanets,
  },
  [CONST_SPECIES]: {
    request: speciesAction.requestSpecies,
    receive: (species) =>
      speciesAction.receiveSpecies(
        species as ListSpecies
      ) as ReduxPromiseAction<ListSpecies>,
    get: speciesSelector.getSpecies,
  },
  [CONST_STARSHIPS]: {
    request: starshipAction.requestStarships,
    receive: (starships) =>
      starshipAction.receiveStarships(
        starships as ListStarships
      ) as ReduxPromiseAction<ListStarships>,
    get: starshipSelector.getStarships,
  },
  [CONST_VEHICLES]: {
    request: vehicleAction.requestVehicles,
    receive: (vehicles) =>
      vehicleAction.receiveVehicles(
        vehicles as ListVehicles
      ) as ReduxPromiseAction<ListVehicles>,
    get: vehicleSelector.getVehicles,
  },
};

const ListPage = () => {
  const { category } = useParams<ListParamTypes>();
  const dispatch = useDispatch();
  const dataByCategory = useSelector(actionByCategory[category].get);
  console.log("ListPage -> dataByCategory", dataByCategory);
  console.log("ListPage -> category", category);

  useEffect(() => {
    const getDataByCategory = async () => {
      dispatch(actionByCategory[category].request());
      const res = await getFromSwapi(`${category}/`);
      dispatch(
        actionByCategory[category].receive(res as AvailableCategoryTypes)
      );
    };

    getDataByCategory();
  }, []);

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <img src={DarthVaderImage} style={{ height: 160, width: 160 }} />
      <h1>{category}</h1>
      {(dataByCategory as any[]).map((data, index) => (
        <div
          key={index}
          style={{
            borderRadius: 8,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            fontFamily: "sans-serif",
            padding: 12,
            marginBottom: 20,
          }}
        >
          <Link
            style={{ textDecoration: "none" }}
            to={{ pathname: `/${category}/${index}` }}
          >
            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                margin: 0,
                color: "rgb(0,0,0)",
              }}
            >
              {data.name || data.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListPage;
