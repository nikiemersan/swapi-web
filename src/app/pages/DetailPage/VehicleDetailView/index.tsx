import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  ListVehicles,
  Vehicle,
  VehicleState,
} from "../../../reducers/vehicle/types";
import { vehicleAction, vehicleSelector } from "../../../reducers/vehicle";
import { RootState } from "../../../reducers/types";

import { getFromSwapi } from "../../../api";
import { CONST_VEHICLES } from "../../../constants";

import { isFirstItem, isLastItem } from "../utils";

interface Props {
  index: number;
}

const VehicleDetailView = (props: Props) => {
  const { index } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const vehicle: Vehicle = useSelector((state: RootState) =>
    vehicleSelector.getVehicleById(state, index)
  );
  const vehicles: VehicleState = useSelector(vehicleSelector.getVehicles);
  console.log("VehicleDetailView -> vehicle", vehicle);

  useEffect(() => {
    const getFilms = async () => {
      dispatch(vehicleAction.requestVehicles());
      const res = await getFromSwapi(`${CONST_VEHICLES}/`);
      dispatch(vehicleAction.receiveVehicles(res as ListVehicles));
    };

    getFilms();
  }, []);

  const onPreviousButtonClick = () => {
    history.push(`${index - 1}`);
  };

  const onNextButtonClick = () => {
    history.push(`${index + 1}`);
  };

  const shouldShowNextButton = !isLastItem(vehicle, vehicles);
  const shouldShowPreviousButton = !isFirstItem(vehicle, vehicles);

  return (
    vehicle && (
      <>
        <h1>{`Vehicle #${index + 1}`}</h1>
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

export default VehicleDetailView;
