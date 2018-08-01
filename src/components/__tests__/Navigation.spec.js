import React from "react";
import { Form } from "zent";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import sinon from "sinon";

import { Navigation } from "../Navigation";

describe("Login component", () => {
  it("should test suite", () => {
    expect(true).toEqual(true);
  });
  // const mockPostUnauthRequest = jest.fn();
  // const NavigationMock = () => (
  //   <Navigation postUnauthRequest={mockPostUnauthRequest} />
  // );
  //
  // it("Should match snapshot", () => {
  //   const component = mount(<NavigationMock />);
  //
  //   expect(toJson(component)).toMatchSnapshot();
  // });
  // username and password
  // it("Should contain username and password input", () => {
  //   const component = mount(<NavigationMock />);
  //   expect(component.text()).toContain("Username");
  //   expect(component.text()).toContain("Password");
  // });
});
