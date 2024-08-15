import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UserProvider } from "../testConfigs/testSetup";
import { MemoryRouter } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import JoblyApi from "../api";

// Mock Jobly API
jest.mock("../api")

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
            <ProfileForm />
          </UserProvider>,
        </MemoryRouter>)
})

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
        <UserProvider>
        <ProfileForm />
      </UserProvider>,
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("updates currUser's info when submitted", function () {
    JoblyApi.updateProfile.mockResolvedValue({
        username: "testuser",
        firstName: "newtestfirst",
        lastName: "newtestlast",
        email: "newemailemail.com"
    })

    const { getByLabelText, queryByText } = render(
        <MemoryRouter>
            <UserProvider>
            <ProfileForm />
          </UserProvider>,
        </MemoryRouter>
    );

    // grab form fields and submit button
    const firstNameInput = getByLabelText("First Name");
    const lastNameInput = getByLabelText("Last Name");
    const emailInput = getByLabelText("Email");
    const btn = queryByText("Save Changes")

    // simulate user input and form submission
    fireEvent.change(firstNameInput, {target: {value: "newtestfirst"}});
    fireEvent.change(lastNameInput, {target: {value: "newtestlast"}});
    fireEvent.change(emailInput, {target: {value: "newemail@email.com"}});
    fireEvent.click(btn);

    expect(firstNameInput.value).toBe("newtestfirst")
    expect(lastNameInput.value).toBe("newtestlast")
    expect(emailInput.value).toBe("newemail@email.com")
});
