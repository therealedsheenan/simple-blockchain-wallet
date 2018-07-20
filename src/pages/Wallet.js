import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "zent";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

import Navigation from "../components/Navigation";

// wallet sub pages
import History from "./wallet/History";
import WalletIndex from "./wallet/index";

const { MenuItem } = Menu;

class Wallet extends Component {
  render() {
    const { match } = this.props;
    return (
      <Router>
        <div className="Wallet">
          <Navigation />
          <div className="Wallet-wrapper">
            <Menu className="Wallet-menu" onClick={() => console.log("test")}>
              <MenuItem key="wallet">
                <Link className="Wallet-menu__link" to={`${match.url}`}>
                  Wallet
                </Link>
              </MenuItem>
              <MenuItem key="history">
                <Link className="Wallet-menu__link" to={`${match.url}/history`}>
                  Transaction History
                </Link>
              </MenuItem>
            </Menu>
            <div className="Wallet-content">
              <Route exact path={match.url} component={WalletIndex} />
              <Route exact path={`${match.url}/history`} component={History} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Wallet;
