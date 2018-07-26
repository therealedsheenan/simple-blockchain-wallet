import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "zent";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { requestWalletListAction } from "../modules/wallet/actions";

const { MenuItem } = Menu;

export class WalletsMenu extends Component {
  static defaultProps = {
    walletList: []
  };

  static propTypes = {
    getWalletListRequest: PropTypes.func.isRequired,
    walletList: PropTypes.array // eslint-disable-line
  };

  componentWillMount() {
    this.props.getWalletListRequest();
  }

  render() {
    const { walletList } = this.props;
    return (
      <Menu mode="inline" className="Wallet-menu">
        {walletList.map(wallet => (
          <MenuItem key={wallet.id}>
            <Link className="Wallet-menu__link" to={`/wallets/${wallet.id}`}>
              {wallet.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default connect(
  state => {
    const { wallet } = state;
    return {
      walletList: Object.keys(wallet.data).map(
        walletId => wallet.data[walletId]
      )
    };
  },
  dispatch => ({
    getWalletListRequest: () => dispatch(requestWalletListAction())
  })
)(WalletsMenu);
