import React from "react";
import { render } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testConfigs/testSetup";
import CompanyList from "./CompaniesList";

it("renders without crashing", function () {
    render(
        <MemoryRouter initialsEntries={["/companies"]}>
            <UserProvider>
                <Routes>
                    <Route path="/companies" element={<CompanyList />} />
                </Routes>
            </UserProvider>
        </MemoryRouter>
    )
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter initialsEntries={["/companies"]}>
            <UserProvider>
                <Routes>
                    <Route path="/companies" element={<CompanyList />} />
                </Routes>
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
