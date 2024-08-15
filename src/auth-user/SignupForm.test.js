import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "../testConfigs/testSetup";
import { MemoryRouter } from "react-router-dom";
import SignupForm from "./SignupForm";

it("renders without crashing", function () {
    render(<MemoryRouter>
                <UserProvider value={{currUser: null}}>
                    <SignupForm />
                </UserProvider>
            </MemoryRouter>)
});

it("matches snapshot", function () {
    const {asFragment} =  render(<MemoryRouter>
                                    <UserProvider value={{currUser: null}}>
                                        <SignupForm />
                                    </UserProvider>
                                </MemoryRouter>)
    expect(asFragment()).toMatchSnapshot();
});