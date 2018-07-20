import React from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import Wallet from "./pages/Wallet";

const App = () => (
  <main className="App">
    <Route exact path="/" component={Home} />
    <Route exact path="/wallet" component={Wallet} />
  </main>
);

export default App;
