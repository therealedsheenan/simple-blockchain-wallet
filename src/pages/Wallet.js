import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "zent";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "../components/Navigation";

// wallet sub pages
import History from "./wallet/History";
import WalletIndex from "./wallet/index";

const { MenuItem } = Menu;

class Wallet extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired // eslint-disable-line
  };
  render() {
    const { match } = this.props;
    return (
      <Router>
        <div className="Wallet">
          <Navigation />
          <div className="Wallet-wrapper">
            <Menu className="Wallet-menu" onClick={() => console.log("test")}>
              <MenuItem key="wallet">
                <Link
                  className="Wallet-menu__link"
                  to={`${match.url}`}
                  href={`${match.url}`}
                >
                  Wallet
                </Link>
              </MenuItem>
              <MenuItem key="history">
                <Link
                  className="Wallet-menu__link"
                  to={`${match.url}/history`}
                  href={`${match.url}/history`}
                >
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
