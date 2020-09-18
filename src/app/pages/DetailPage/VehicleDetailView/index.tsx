import React from "react";
import { useSelector } from "react-redux";

import { Vehicle } from "../../../reducers/vehicle/types";
import { vehicleSelector } from "../../../reducers/vehicle";
import { RootState } from "../../../reducers/types";

interface Props {
  index: number;
}

const VehicleDetailView = (props: Props) => {
  const { index } = props;

  const vehicle: Vehicle = useSelector((state: RootState) =>
    vehicleSelector.getVehicleById(state, index)
  );
  console.log("VehicleDetailView -> vehicle", vehicle);

  return (
    vehicle && (
      <>
        <p>Name</p>
        <p>{vehicle.name}</p>
        <p>Model</p>
        <p>{vehicle.model}</p>
        <p>Vehicle Class</p>
        <p>{vehicle.vehicleClass}</p>
        <p>Manufacturer</p>
        <p>{vehicle.manufacturer}</p>
        <p>Length</p>
        <p>{vehicle.length}</p>
        <p>Cost in Credits</p>
        <p>{vehicle.costInCredits}</p>
        <p>Crew</p>
        <p>{vehicle.crew}</p>
        <p>Passengers</p>
        <p>{vehicle.passengers}</p>
        <p>Max Atmosphering Speed</p>
        <p>{vehicle.maxAtmospheringSpeed}</p>
        <p>Cargo Capacity</p>
        <p>{vehicle.cargoCapacity}</p>
        <p>Consumables</p>
        <p>{vehicle.consumables}</p>
        <p>Created</p>
        <p>{vehicle.created}</p>
        <p>Edited</p>
        <p>{vehicle.edited}</p>
      </>
    )
  );
};

export default VehicleDetailView;
