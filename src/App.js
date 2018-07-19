import React, { Component } from "react";
import "./App.css";
import { Button, Layout } from "zent";

const { Row, Col } = Layout;

class App extends Component {
  render() {
    return (
      <main className="App">
        <Row>
          <Col span={10}>Col 24</Col>
        </Row>
      </main>
    );
  }
}

export default App;
