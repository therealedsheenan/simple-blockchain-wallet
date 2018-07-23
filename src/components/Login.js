import { Form, Radio, Notify, Button, Layout } from "zent";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Bitgo from "bitgo";

const { Field, FormInputField, createForm } = Form;
const { Row, Col } = Layout;

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  submit = (values, zentForm) => {
    Notify.success(JSON.stringify(values));
    console.log(`Submitted${values}`);
    // Bitgo
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Row>
        <Col span={8} offset={8}>
          <div className="Login">
            <h1>Login</h1>
            <Form vertical onSubmit={handleSubmit(this.submit)}>
              <FormInputField
                name="username"
                type="text"
                label="Username:"
                value=""
              />
              <FormInputField
                name="password"
                type="password"
                label="Password:"
                value=""
              />
              <div className="zent-form__form-actions">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}
export default createForm()(Login);
