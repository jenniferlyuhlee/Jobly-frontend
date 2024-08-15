import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

it("renders without crashing", function () {
    render(<Loading />);
})

it("matches snapshot", function () {
    const {asFragment} = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
})
