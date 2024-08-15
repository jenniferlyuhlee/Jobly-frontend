import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testConfigs/testSetup";
import UserJobs from "./UserJobs";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <UserJobs />
            </UserProvider>
        </MemoryRouter>
    );
})

it("matches snapshot", function () {
    const {asFragment} = render(
                            <MemoryRouter>
                                <UserProvider>
                                    <UserJobs />
                                </UserProvider>
                            </MemoryRouter>
                        );
    expect(asFragment()).toMatchSnapshot();
})