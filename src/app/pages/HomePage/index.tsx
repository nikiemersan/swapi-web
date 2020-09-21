import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DarthVaderImage from "../../assets/darth-vader.png";

import { getFromSwapi } from "../../api";

import { categoryAction, categorySelector } from "../../reducers/category";

import { Category } from "../../reducers/category/types";
import LoadingPage from "../LoadingPage";

const HomePage = () => {
  const dispatch = useDispatch();

  const isLoaded = useSelector(categorySelector.isCategoryLoaded);
  const isLoading = useSelector(categorySelector.isCategoryLoading);
  const categories = useSelector(categorySelector.getCategories);

  useEffect(() => {
    const getCategoriesFromSwapi = async () => {
      dispatch(categoryAction.requestCategories());
      const res = await getFromSwapi();
      dispatch(categoryAction.receiveCategories(res as Category));
      dispatch(categoryAction.requestCategoriesSuccess());
    };

    if (!isLoaded && !isLoading) {
      getCategoriesFromSwapi();
    }
  }, []);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div style={{ padding: 32, textAlign: "center" }}>
      <img src={DarthVaderImage} alt={""} style={{ height: 160, width: 160 }} />
      <h1>Starwars Website</h1>
      {categories.map((category) => (
        <div
          key={category}
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
            to={{
              pathname: `/${category}`,
            }}
          >
            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                margin: 0,
                color: "rgb(0,0,0)",
              }}
            >
              {category}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
