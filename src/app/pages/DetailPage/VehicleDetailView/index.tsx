import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ListVehicles, Vehicle } from "../../../reducers/vehicle/types";
import { vehicleAction, vehicleSelector } from "../../../reducers/vehicle";
import { RootState } from "../../../reducers/types";

import { getFromSwapi } from "../../../api";
import { CONST_VEHICLES } from "../../../constants";

import DarthVaderImage from "../../../assets/darth-vader.png";
import ArrowBack from "../../../assets/arrow-left.png";
import ArrowNext from "../../../assets/arrow-right.png";

import { isFirstItem, isLastItem } from "../utils";
import LoadingPage from "../../LoadingPage";
import PeopleSection from "../sections/PeopleSection";
import FilmSection from "../sections/FilmSection";

interface Props {
  index: number;
}

const VehicleDetailView = (props: Props) => {
  const { index } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoaded: Boolean = useSelector(vehicleSelector.isVehicleLoaded);
  const isLoading: Boolean = useSelector(vehicleSelector.isVehicleLoading);
  const vehicle: Vehicle = useSelector((state: RootState) =>
    vehicleSelector.getVehicleById(state, index)
  );
  const vehicles: Vehicle[] = useSelector(vehicleSelector.getVehicles);

  useEffect(() => {
    const getAllVehicles = async () => {
      dispatch(vehicleAction.requestVehicles());

      let shouldRequestData = true;
      let queryString = "";
      let res;
      while (shouldRequestData) {
        res = await getFromSwapi(`${CONST_VEHICLES}/${queryString}`);
        dispatch(vehicleAction.receiveVehicles(res as ListVehicles));

        if ("next" in res && res.next) {
          queryString = res.next.substring(res.next.indexOf("?"));
        } else {
          shouldRequestData = false;
        }
      }
      dispatch(vehicleAction.requestVehiclesSuccess());
    };

    if (!isLoaded && !isLoading) {
      getAllVehicles();
    }
  }, []);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(vehicle, vehicles);
  const shouldShowPreviousButton = !isFirstItem(vehicle, vehicles);

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
        <h1 style={{ display: "inline-block" }}>{`Vehicle #${index + 1}`}</h1>
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
      <p>{vehicle.name}</p>
      <h3>Model</h3>
      <p>{vehicle.model}</p>
      <h3>Vehicle Class</h3>
      <p>{vehicle.vehicle_class}</p>
      <h3>Manufacturer</h3>
      <p>{vehicle.manufacturer}</p>
      <h3>Length</h3>
      <p>{vehicle.length}</p>
      <h3>Cost in Credits</h3>
      <p>{vehicle.cost_in_credits}</p>
      <h3>Crew</h3>
      <p>{vehicle.crew}</p>
      <h3>Passengers</h3>
      <p>{vehicle.passengers}</p>
      <h3>Max Atmosphering Speed</h3>
      <p>{vehicle.max_atmosphering_speed}</p>
      <h3>Cargo Capacity</h3>
      <p>{vehicle.cargo_capacity}</p>
      <h3>Consumables</h3>
      <p>{vehicle.consumables}</p>
      <h3>Pilots</h3>
      <PeopleSection urls={vehicle.pilots} />
      <h3>Films</h3>
      <FilmSection urls={vehicle.films} />
    </div>
  );
};

export default VehicleDetailView;
