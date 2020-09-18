import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./app/reducers";

import Routes from "./app/routes";

function App() {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
