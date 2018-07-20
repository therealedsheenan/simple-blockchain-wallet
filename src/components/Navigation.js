import React, { Component } from "react";
import { Layout } from "zent";

const { Row, Col } = Layout;

class Navigation extends Component {
  render() {
    return (
      <div className="Navigation theme-primary-2">
        <Row>
          <Col>
            <h1>Simple blockchain wallet</h1>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Navigation;
