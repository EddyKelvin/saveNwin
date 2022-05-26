import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { ToastContainer } from "react-toast";
import React from "react";
import { Provider } from "react-redux";
import Routes from "./Routes";
import store from "./Store";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <ToastContainer position="top-right" />
    </Provider>
  );
};

export default App;
