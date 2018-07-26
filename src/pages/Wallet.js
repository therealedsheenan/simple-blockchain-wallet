import React, { Component } from "react";
import { Card, Layout, Tag, Notify } from "zent";

import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import Placeholder from "../components/Placeholder";

// actions
import { requestWalletAction } from "../modules/wallet/actions";

// selector
import Navigation from "../components/Navigation";

const { Row, Col } = Layout;

class Wallet extends Component {
  static defaultProps = {
    // loading: false
  };

  static propTypes = {
    getWalletRequest: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line
    loading: PropTypes.bool,
    wallet: PropTypes.object.isRequired // eslint-disable-line
  };

  componentWillMount() {
    const { wallet, match } = this.props;

    this.props.getWalletRequest(match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.wallet.error) {
      Notify.error(this.props.wallet.error);
    }
  }

  triggerFailure = () => {
    this.setState({ componentFailure: true });
  };

  renderWallet = () => {
    const { wallet, match, loading } = this.props;
    return (
      !wallet.error && (
        <div className="Wallet">
          <Navigation />
          <div className="Wallet-content">
            <Row>
              <Col span={8}>
                <Card
                  title={
                    <div>
                      Wallet Name: {wallet.label}{" "}
                      {wallet.isActive ? (
                        <Tag color="green">Active</Tag>
                      ) : (
                        <Tag color="red">Inactive</Tag>
                      )}
                    </div>
                  }
                >
                  <label className="Wallet-balance__label">
                    Wallet ID:{" "}
                    <span className="Wallet-balance__text"> {wallet.id}</span>
                  </label>
                  <label className="Wallet-balance__label">
                    Balance:{" "}
                    <span className="Wallet-balance__text">
                      {" "}
                      {wallet.balance}
                    </span>
                  </label>
                  <label className="Wallet-balance__label">
                    Sent:{" "}
                    <span className="Wallet-balance__text"> {wallet.sent}</span>
                  </label>
                  <label className="Wallet-balance__label">
                    Received:{" "}
                    <span className="Wallet-balance__text">
                      {" "}
                      {wallet.received}
                    </span>
                  </label>
                  <label className="Wallet-balance__label">
                    Unconfirmed sends:{" "}
                    <span className="Wallet-balance__text">
                      {" "}
                      {wallet.unconfirmedSends}
                    </span>
                  </label>
                  <label className="Wallet-balance__label">
                    Unconfirmed receives:{" "}
                    <span className="Wallet-balance__text">
                      {" "}
                      {wallet.unconfirmedReceives}
                    </span>
                  </label>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )
    );
  };

  renderLoading = () => <Placeholder />;

  render() {
    return this.props.wallet.isLoading
      ? this.renderLoading()
      : this.renderWallet();
  }
}

export default connect(
  (state, ownProps) => {
    const { wallet } = state;
    const { match } = ownProps;
    return {
      wallet: wallet.data[match.params.id] || wallet.data
    };
  },
  dispatch => ({
    getWalletRequest: walletId => dispatch(requestWalletAction(walletId))
  })
)(Wallet);
