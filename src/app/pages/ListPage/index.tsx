import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import DarthVaderImage from "../../assets/darth-vader.png";
import ArrowBack from "../../assets/arrow-left.png";
import ArrowNext from "../../assets/arrow-right.png";

import { getFromSwapi } from "../../api";

import { actionByCategory } from "./constants";
import { ListParamTypes, AvailableCategoryTypes } from "./types";
import { Species } from "../../reducers/species/types";
import { Starship } from "../../reducers/starship/types";
import { Vehicle } from "../../reducers/vehicle/types";
import { People } from "../../reducers/people/types";
import { Planet } from "../../reducers/planet/types";
import { Film } from "../../reducers/film/types";

const ListPage = () => {
  const { category } = useParams<ListParamTypes>();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const isLoaded = useSelector(actionByCategory[category].isLoaded);
  const isLoading = useSelector(actionByCategory[category].isLoading);
  const dataByCategory = useSelector(actionByCategory[category].get);

  useEffect(() => {
    const getAllDataByCategory = async () => {
      dispatch(actionByCategory[category].request());

      let shouldRequestData = true;
      let queryString = "";
      let res;
      while (shouldRequestData) {
        res = await getFromSwapi(`${category}/${queryString}`);
        dispatch(
          actionByCategory[category].receive(res as AvailableCategoryTypes)
        );

        if ("next" in res && res.next) {
          queryString = res.next.substring(res.next.indexOf("?"));
        } else {
          shouldRequestData = false;
        }
      }
      dispatch(actionByCategory[category].request_success());
    };

    if (!isLoaded && !isLoading) {
      getAllDataByCategory();
    }
  }, []);

  const renderSomeDataByCategory = (): JSX.Element => {
    console.log("ListPage -> dataByCategory", dataByCategory);

    var index;
    const dataElements: JSX.Element[] = [];
    for (
      index = currentPage - 1;
      index < dataByCategory.length && index < currentPage - 1 + 10;
      index++
    ) {
      dataElements.push(
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
              {(dataByCategory[index] as
                | People
                | Planet
                | Species
                | Starship
                | Vehicle).name || (dataByCategory[index] as Film).title}
            </p>
          </Link>
        </div>
      );
    }

    return <>{dataElements.map((element) => element)}</>;
  };

  const onPreviousButtonClick = () => setCurrentPage(currentPage - 1);

  const onNextButtonClick = () => setCurrentPage(currentPage + 1);

  const shouldShowPreviousButton: Boolean = currentPage - 1 >= 1;
  const shouldShowNextButton: Boolean =
    (currentPage + 1) * 10 < dataByCategory.length;

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <img src={DarthVaderImage} alt={""} style={{ height: 160, width: 160 }} />
      <h1>{category}</h1>
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
        <h3 style={{ display: "inline-block" }}>Page {currentPage}</h3>
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
        {dataByCategory.length > 0 && renderSomeDataByCategory()}
      </div>
    </div>
  );
};

export default ListPage;
