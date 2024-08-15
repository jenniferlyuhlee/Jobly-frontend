import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testConfigs/testSetup"
import Home from "./Home";

it("renders without crashing", function () {
    render(
    <MemoryRouter>
        <UserProvider>
          <Home />
        </UserProvider>
    </MemoryRouter>)
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider>
            <Home />
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

// it("contains appropriate text when logged in", function () {
//   const { getByText } = render(
//     <MemoryRouter>
//       <UserProvider>
//         <Home />
//       </UserProvider>
//     </MemoryRouter>,
//   );

//   const h1 = getByText("Welcome back testfirst");
//   expect(h1).toBeInTheDocument();
// })

it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider currentUser={null}>
            <Home />
          </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  