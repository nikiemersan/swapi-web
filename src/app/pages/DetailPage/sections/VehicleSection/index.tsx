import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { vehicleAction, vehicleSelector } from "../../../../reducers/vehicle";
import { ListVehicles, Vehicle } from "../../../../reducers/vehicle/types";

import { CONST_VEHICLES } from "../../../../constants";
import { getFromSwapi } from "../../../../api";

import { getIndexesFromUrls } from "../../utils";

interface SectionPropTypes {
  urls: string[];
}

const VehicleSection = ({ urls }: SectionPropTypes): JSX.Element => {
  const dispatch = useDispatch();
  const indexes: number[] = getIndexesFromUrls(urls);

  const isLoaded: Boolean = useSelector(vehicleSelector.isVehicleLoaded);
  const isLoading: Boolean = useSelector(vehicleSelector.isVehicleLoading);
  const allVehicles: Vehicle[] = useSelector(vehicleSelector.getVehicles);

  const selectedVehicles: (
    | Vehicle
    | undefined
  )[] = indexes.map((index: number): Vehicle | undefined =>
    allVehicles[index] ? allVehicles[index] : undefined
  );

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

  return selectedVehicles.length === 0 ? (
    <p>-</p>
  ) : (
    <div>
      {selectedVehicles.map(
        (vehicle: Vehicle | undefined, index: number): JSX.Element => (
          <span>
            {vehicle?.name}
            {index !== selectedVehicles.length - 1 && ", "}
          </span>
        )
      )}
    </div>
  );
};

export default VehicleSection;
