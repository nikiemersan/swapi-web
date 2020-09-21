import React from "react";
import { useParams } from "react-router-dom";

import {
  CONST_FILMS,
  CONST_PEOPLE,
  CONST_PLANETS,
  CONST_SPECIES,
  CONST_STARSHIPS,
  CONST_VEHICLES,
} from "../../constants";

import FilmDetailView from "./FilmDetailView";
import PeopleDetailView from "./PeopleDetailView";
import PlanetDetailView from "./PlanetDetailView";
import SpeciesDetailView from "./SpeciesDetailView";
import StarshipDetailView from "./StarshipDetailView";
import VehicleDetailView from "./VehicleDetailView";

interface DetailParamTypes {
  category: string;
  index: string;
}

const DetailPage = (): JSX.Element => {
  const { category, index } = useParams<DetailParamTypes>();
  const indexNumber: number = parseInt(index, 10);

  const getDataDetailView = (): JSX.Element => {
    switch (category) {
      case CONST_FILMS:
        return <FilmDetailView index={indexNumber} />;
      case CONST_PEOPLE:
        return <PeopleDetailView index={indexNumber} />;
      case CONST_PLANETS:
        return <PlanetDetailView index={indexNumber} />;
      case CONST_SPECIES:
        return <SpeciesDetailView index={indexNumber} />;
      case CONST_STARSHIPS:
        return <StarshipDetailView index={indexNumber} />;
      case CONST_VEHICLES:
        return <VehicleDetailView index={indexNumber} />;
      default:
        return <FilmDetailView index={indexNumber} />;
    }
  };

  return getDataDetailView();
};

export default DetailPage;
