import React, { Component } from "react";
import { Card, Form, Button, Layout, Tag } from "zent";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { requestWalletAction } from "../../modules/wallet/actions";

const { FormInputField, createForm } = Form;
const { Row, Col } = Layout;

class SendForm extends Component {
  render() {
    return (
      <Form horizontal onSubmit={() => console.log("submit")}>
        <FormInputField
          name="address"
          type="text"
          label="Wallet Address:"
          required
          spellCheck={false}
          validations={{ required: true }}
          validationErrors={{ required: "Please enter the wallet address." }}
        />
        <FormInputField
          name="amount"
          type="number"
          label="Amount: "
          required
          addonBefore="$"
          spellCheck={false}
          validations={{ required: true }}
          validationErrors={{ required: "Please enter the value" }}
        />
        <div className="zent-form__form-actions">
          <Button type="primary" htmlType="submit">
            Send
          </Button>
          <Button type="primary" outline onClick={() => console.log("reset")}>
            Reset
          </Button>
        </div>
      </Form>
    );
  }
}

const SendBitcoinForm = createForm()(SendForm);

class index extends Component {
  static propTypes = {
    getWalletRequest: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired // eslint-disable-line
  };

  componentDidMount() {
    const { wallet, match } = this.props;
    if (match.params) {
      this.props.getWalletRequest(match.params.id);
    }
  }

  render() {
    const { wallet, match } = this.props;
    return (
      <div>
        <Row>
          <Col span={8}>
            <Card title={<div>Wallet Name: {wallet.label} {wallet.isActive ? (<Tag color="green">Active</Tag>): (<Tag color="red">Inactive</Tag>)}</div>}>
              <label className="Wallet-balance__label">
                Wallet ID: <span className="Wallet-balance__text"> {wallet.id}</span>
              </label>
              <label className="Wallet-balance__label">
                Balance: <span className="Wallet-balance__text"> {wallet.balance}</span>
              </label>
              <label className="Wallet-balance__label">
                Sent: <span className="Wallet-balance__text"> {wallet.sent}</span>
              </label>
              <label className="Wallet-balance__label">
                Received: <span className="Wallet-balance__text"> {wallet.received}</span>
              </label>
              <label className="Wallet-balance__label">
                Unconfirmed sends: <span className="Wallet-balance__text"> {wallet.unconfirmedSends}</span>
              </label>
              <label className="Wallet-balance__label">
                Unconfirmed receives: <span className="Wallet-balance__text"> {wallet.unconfirmedReceives}</span>
              </label>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card title="Send Bitcoins">
              <SendBitcoinForm />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ wallet }) => ({
    wallet: wallet.data
  }),
  dispatch => ({
    getWalletRequest: (walletId) => dispatch(requestWalletAction(walletId))
  })
)(index)
