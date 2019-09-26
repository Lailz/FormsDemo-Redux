import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";

// Data Loaders
import { fetchPeople } from "./redux/actions";

import store from "./redux";

store.dispatch(fetchPeople());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
