import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";

it ("renders without crashing", function () {
    render(<Alert />);
})

it("matches snapshot for error alerts", function() {
    let messages=["Password needs to be atleast 5 characters.", "Username taken."]

    const {asFragment}= render(
        <Alert type="danger" messages={messages}/>
    );
    expect(asFragment()).toMatchSnapshot();
})

it("matches snapshot for success alerts", function (){
    let messages=["Successful", "Saved"]

    const {asFragment} = render(
        <Alert type="success" messages={messages} />
    );
    expect(asFragment()).toMatchSnapshot();
});