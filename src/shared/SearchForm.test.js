import React from "react";
import {render} from "@testing-library/react"
import SearchForm from "./SearchForm";

it("renders without crashing", function (){
    render(<SearchForm />);
})

it("matches snapshot", function (){
    const {asFragment} = render(<SearchForm placeholder="test"/>);
    expect(asFragment()).toMatchSnapshot();
})