import React, { Component } from "react";
import { Card, Form, Button, Layout, Tag, Notify } from "zent";

import PropTypes from "prop-types";
import { connect } from "react-redux";

// components
import BitcoinForm from "../../components/Forms/Bitcoin";
import Placeholder from "../../components/Placeholder";

// actions
import { requestWalletAction } from "../../modules/wallet/actions";

// selector
import loadingSelector from "../../modules/loading/selector";

const { Row, Col } = Layout;

class index extends Component {
  static defaultProps = {
    loading: false
  };

  static propTypes = {
    getWalletRequest: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line
    loading: PropTypes.bool,
    wallet: PropTypes.object.isRequired // eslint-disable-line
  };

  componentWillMount() {
    const { wallet, match } = this.props;
    if (match.params) {
      this.props.getWalletRequest(match.params.id);
    }
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
        <div>
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
          <Row style={{ marginTop: 20 }}>
            <Col span={8}>
              <Card title="Send Bitcoins">
                <BitcoinForm />
              </Card>
            </Col>
          </Row>
        </div>
      )
    );
  };

  renderLoading = () => <Placeholder />;

  render() {
    return this.props.loading ? this.renderLoading() : this.renderWallet();
  }
}

const walletLoading = loadingSelector(["GET_WALLET"]);

export default connect(
  (state, ownProps) => {
    const { wallet } = state;
    const { match } = ownProps;
    return {
      wallet: wallet.data[match.params.id],
      loading: walletLoading(state)
    };
  },
  dispatch => ({
    getWalletRequest: walletId => dispatch(requestWalletAction(walletId))
  })
)(index);
