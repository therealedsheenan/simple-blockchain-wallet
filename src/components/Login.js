import { Form, Radio, Notify, Button, Layout } from "zent";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postAuthRequest } from "../modules/auth/actions";

const { Field, FormInputField, createForm } = Form;
const { Row, Col } = Layout;

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    postAuthRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  submit = (values, zentForm) => {
    // Notify.success(JSON.stringify(values));
    // console.log(values);
    // console.log(zentForm);
    const { username, password } = values;
    this.props.postAuthRequest(username, password);
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
                required
                validations={{
                  required: true
                }}
              />
              <FormInputField
                name="password"
                type="password"
                label="Password:"
                required
                validations={{
                  required: true
                }}
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
export default connect(
  auth => ({ auth }),
  dispatch => ({
    postAuthRequest: (username, password) =>
      dispatch(postAuthRequest(username, password))
  })
)(createForm()(Login));
