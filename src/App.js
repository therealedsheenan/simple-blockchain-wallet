import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./pages/Home";
import Wallet from "./pages/Wallet";

const Private = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.auth.data.isAuthenticated ? <Component {...props} /> : null
      }
    />
  );
};

const PrivateRoute = connect(
  ({ auth }) => ({ auth }),
  null
)(Private);

const App = () => (
  <main className="App">
    <Route exact path="/" component={Home} />
    <Route exact path="/wallet" component={Wallet} />
    <PrivateRoute exact path="/" component={() => <div>private,,,</div>} />
  </main>
);

export default App;
