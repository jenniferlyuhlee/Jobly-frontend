import React from "react";
import { render } from "@testing-library/react";
import CompanyDetails from "./CompanyDetail";
import { UserProvider } from "../testConfigs/testSetup";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
    render(
        <MemoryRouter initialsEntries={["/companies/test-company1"]}>
            <UserProvider>
                <CompanyDetails />
            </UserProvider>
        </MemoryRouter>
    )
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter initialsEntries={["/companies/test-company1"]}>
            <UserProvider>
                <CompanyDetails />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
