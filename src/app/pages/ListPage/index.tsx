import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import DarthVaderImage from "../../assets/darth-vader.png";

import { getFromSwapi } from "../../api";

import { actionByCategory } from "./constants";
import { ListParamTypes, AvailableCategoryTypes } from "./types";

const ListPage = () => {
  const { category } = useParams<ListParamTypes>();
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

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <img src={DarthVaderImage} alt={""} style={{ height: 160, width: 160 }} />
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
