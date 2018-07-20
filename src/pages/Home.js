import React, { Component } from "react";

import Login from "../components/Login";
import Navigation from "../components/Navigation";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Navigation />
        <Login />
      </div>
    );
  }
}

export default Home;
