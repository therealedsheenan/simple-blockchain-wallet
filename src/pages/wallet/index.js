import React, { Component } from "react";
import { Card, Form, Button, Layout } from "zent";

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
  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <Card title="Wallet Balance">
              <p>
                Balance: <span> 100</span>
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

export default index;
