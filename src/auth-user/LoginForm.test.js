import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "../testConfigs/testSetup";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

it("renders without crashing", function () {
    render(
    <MemoryRouter>
        <UserProvider value={{currUser: null}}>
            <LoginForm />
        </UserProvider>
    </MemoryRouter>)
});
        

it("matches snapshot", function () {
    const {asFragment} = render(
                        <MemoryRouter>
                            <UserProvider value={{currUser: null}}>
                                <LoginForm />
                            </UserProvider>
                        </MemoryRouter>)
    expect(asFragment()).toMatchSnapshot();
});