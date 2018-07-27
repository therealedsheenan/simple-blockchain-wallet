import React from "react";
import { Form, Button } from "zent";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navigation from "../components/Navigation";
import { postSendBitcoinRequest } from "../modules/bitcoin/actions";
import { requestWalletListAction } from "../modules/wallet/actions";

const { FormInputField, createForm, FormSelectField } = Form;

class Bitcoin extends React.Component {
  static defaultProps = {
    walletList: []
  };
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    postSendBitcoinRequest: PropTypes.func.isRequired,
    getWalletListRequest: PropTypes.func.isRequired,
    walletList: PropTypes.array // eslint-disable-line
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

  componentWillMount() {
    this.props.getWalletListRequest();
  }

  render() {
    const { walletList } = this.props;
    return (
      <div className="Wallet">
        <Navigation />
        <div className="Wallet-content">
          <Form
            horizontal
            onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
          >
            <FormSelectField
              name="walletId"
              label="Wallet ID: "
              data={walletList}
              required
              validations={{ required: true }}
              validationErrors={{ required: "Please choose the wallet ID." }}
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
  state => {
    const { wallet } = state;
    return {
      walletList: Object.keys(wallet.data)
        .map(walletId => wallet.data[walletId])
        .map(wal => {
          return {
            ...wal,
            value: wal.id,
            text: wal.label
          };
        }, [])
    };
  },
  dispatch => ({
    getWalletListRequest: () => dispatch(requestWalletListAction()),
    postSendBitcoinRequest: (walletId, walletPass, destination, amount) =>
      dispatch(
        postSendBitcoinRequest(walletId, walletPass, destination, amount)
      )
  })
)(createForm()(Bitcoin));
