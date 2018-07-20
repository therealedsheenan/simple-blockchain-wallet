import React, { Component } from "react";
import { Card, Form, Button, Layout } from "zent";
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

const SendBitcoinForm = createForm()(SendForm
);

class index extends Component {
  static propTypes = {
    getWalletRequest: PropTypes.func.isRequired
  };
  componentWillMount() {
    this.props.getWalletRequest();
  }
  render() {
    const { wallet } = this.props;
    return (
      <div>
        <Row>
          <Col span={8}>
            <Card title="Wallet Balance">
              <p>
                Balance: <span className="Wallet-balance__text"> {wallet.balance}</span>
              </p>
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
    getWalletRequest: () => dispatch(requestWalletAction())
  })
)(index)
