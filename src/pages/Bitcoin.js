import React from "react";
import { Form, Button } from "zent";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navigation from "../components/Navigation";
import { postSendBitcoinRequest } from "../modules/bitcoin/actions";

const { FormInputField, createForm } = Form;

class Bitcoin extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    postSendBitcoinRequest: PropTypes.func.isRequired
  };

  handleFormSubmit = values => {
    const { walletId, passphrase, destination, amount } = values;
    this.props.postSendBitcoinRequest(
      walletId,
      passphrase,
      destination,
      amount
    );
  };

  render() {
    return (
      <div className="Wallet">
        <Navigation />
        <div className="Wallet-content">
          <Form
            horizontal
            onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
          >
            <FormInputField
              name="walletId"
              type="text"
              label="Wallet ID: "
              required
              spellCheck={false}
              validations={{ required: true }}
              validationErrors={{ required: "Please enter the value" }}
            />
            <FormInputField
              name="passphrase"
              type="password"
              label="Wallet passphrase: "
              required
              spellCheck={false}
              validations={{ required: true }}
              validationErrors={{ required: "Please enter the value" }}
            />
            <FormInputField
              name="destination"
              type="text"
              label="Recipient Address:"
              required
              spellCheck={false}
              validations={{ required: true }}
              validationErrors={{
                required: "Please enter the wallet address."
              }}
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
              <Button
                type="primary"
                outline
                onClick={() => console.log("reset")}
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(
  () => {},
  dispath => ({
    postSendBitcoinRequest: (walletId, walletPass, destination, amount) =>
      dispath(postSendBitcoinRequest(walletId, walletPass, destination, amount))
  })
)(createForm()(Bitcoin));
