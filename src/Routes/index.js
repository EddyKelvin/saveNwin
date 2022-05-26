import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//layouts
import PublicLayout from "../Layouts/Public";
import ProtectedLayout from "../Layouts/Private";

//actions
import { setAuth } from "../Store/actions/auth";

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuth());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Switch>
        <Route path="/account" component={ProtectedLayout} />
        <Route path="/" render={(props) => <PublicLayout {...props} />} />
      </Switch>
    </Router>
  );
};

export default Routes;
