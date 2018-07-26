import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "zent";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "../components/Navigation";
import WalletsMenu from "../components/WalletsMenu";

// actions
import { requestWalletListAction } from "../modules/wallet/actions";

const { MenuItem, SubMenu } = Menu;

class Wallets extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired // eslint-disable-line,
  };

  render() {
    const { match } = this.props;
    return (
      <div className="Wallet">
        <Navigation />
        <div className="Wallet-wrapper">
          <WalletsMenu />
        </div>
      </div>
    );
  }
}

export default Wallets;
