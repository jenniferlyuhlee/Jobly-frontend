import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { MemoryRouter } from "react-router-dom";

const company1 = {
    name: "Test Company1",
    handle: "test-company1",
    description: "This is a test for company1.",
}

const company2 = {
    name: "Test Company2",
    handle: "test-company2",
    description: "This is a test for company2.",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
}

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <CompanyCard company={company1}/>
        </MemoryRouter>
    )
});

it("matches snapshot with logo_url", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <CompanyCard company={company1}/>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot with logo_url", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <CompanyCard company={company2}/>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});