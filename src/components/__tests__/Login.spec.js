import React from "react";
import { Form } from "zent";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { Login } from "../Login";

const { createForm } = Form;

describe("Login component", () => {
  const mockHandleSubmit = jest.fn();
  const mockPostAuthRequest = jest.fn();
  const mockAuth = {};
  const LoginForm = createForm()(() => (
    <Login
      handleSubmit={mockHandleSubmit}
      postAuthRequest={mockPostAuthRequest}
      auth={mockAuth}
    />
  ));

  it("Should match snapshot", () => {
    const component = mount(<LoginForm />);

    expect(toJson(component)).toMatchSnapshot();
  });
});
