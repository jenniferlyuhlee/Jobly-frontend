import React from "react";
import {render} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobCard from "./JobCard";
import { UserProvider } from "../testConfigs/testSetup";

const testJob = {
    title: "Test",
    companyHandle: "test-company",
    companyName: "Test Company",
    salary: 110000,
    equity: 0.4,
}

it("renders without crashing", function () {
    render (
        <MemoryRouter>
            <UserProvider>
                <JobCard job={testJob} />
            </UserProvider>
        </MemoryRouter>
    )
});

it("matches snapshot", function () {
    const { asFragment } = render (
        <MemoryRouter>
            <UserProvider>
                <JobCard job={testJob} />
            </UserProvider>
        </MemoryRouter>
    )
})