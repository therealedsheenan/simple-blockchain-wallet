import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "zent";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "../components/Navigation";

// actions
import { requestWalletListAction } from "../modules/walletList/actions";

// wallet sub pages
import History from "./wallet/History";
import WalletIndex from "./wallet/index";

const { MenuItem, SubMenu } = Menu;

class Wallet extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // eslint-disable-line,
    getWalletListRequest: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.getWalletListRequest();
  }
  render() {
    const { match, walletList } = this.props;
    return (
      <Router>
        <div className="Wallet">
          <Navigation />
          <div className="Wallet-wrapper">
            <Menu className="Wallet-menu">
              <SubMenu className="test" title="Wallets" overlayClassName="sub">
                {walletList.map(wallet => (
                  <MenuItem key={wallet.id}>
                    <Link
                      className="Wallet-menu__link"
                      to={`${match.url}/${wallet.id}`}
                      href={`${match.url}/${wallet.id}`}
                    >
                      {wallet.label}
                    </Link>
                  </MenuItem>
                ))}
              </SubMenu>
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
              <Route
                path={`${match.url}/:id`}
                render={props => (
                  <WalletIndex key={props.match.params.id} {...props} />
                )}
              />
              <Route exact path={`${match.url}/history`} component={History} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(
  ({ walletList }) => ({ walletList: walletList.data }),
  dispatch => ({
    getWalletListRequest: () => dispatch(requestWalletListAction())
  })
)(Wallet);
