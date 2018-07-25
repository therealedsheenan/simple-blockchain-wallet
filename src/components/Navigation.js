import React, { Component } from "react";
import { Layout, Button } from "zent";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getToken, getUser } from "../utils";
import { postUnauthRequest } from "../modules/auth/actions";

const { Row, Col } = Layout;

class Navigation extends Component {
  static propTypes = {
    postUnauthRequest: PropTypes.func.isRequired
  };
  state = {
    user: {}
  };

  componentWillMount() {
    if (getToken()) {
      this.setState({
        user: {
          ...getUser(),
          isAuthenticated: !!getUser()
        }
      });
    }

    // logout here
  }
  render() {
    const { state, props } = this;
    return (
      <div className="Navigation theme-primary-2">
        <Row>
          <Col span={12}>
            <h1>Simple blockchain wallet</h1>
          </Col>
          <Col span={12}>
            {state.user.isAuthenticated && (
              <div className="Navigation-user">
                <span>{state.user.username}</span>
                <Button type="danger" outline onClick={props.postUnauthRequest}>
                  Logout
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  dispatch => ({
    postUnauthRequest: () => dispatch(postUnauthRequest())
  })
)(Navigation);
