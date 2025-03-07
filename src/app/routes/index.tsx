import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DetailPage from "../pages/DetailPage/Loadable";
import HomePage from "../pages/HomePage/Loadable";
import ListPage from "../pages/ListPage/Loadable";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/:category"} component={ListPage} />
        <Route exact path={"/:category/:index"} component={DetailPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
