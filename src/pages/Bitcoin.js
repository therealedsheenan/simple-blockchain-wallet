import React from "react";
import { Form, Button } from "zent";
import Navigation from "../components/Navigation";

const { FormInputField, createForm } = Form;

class Bitcoin extends React.Component {
  render() {
    return (
      <div className="Wallet">
        <Navigation />
        <div className="Wallet-content">
          <Form horizontal onSubmit={() => console.log("submit")}>
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
              name="address"
              type="text"
              label="Wallet Address:"
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

export default createForm()(Bitcoin);
