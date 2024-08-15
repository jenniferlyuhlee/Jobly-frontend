import React from 'react';
import {render} from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../testConfigs/testSetup';
import RouteList from './RouteList';

it("renders without crashing" , function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <RouteList />
            </UserProvider>
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const {asFragment} = render(
        <MemoryRouter>
            <UserProvider>
                <RouteList />
            </UserProvider>
        </MemoryRouter>
    );
    
    expect(asFragment()).toMatchSnapshot();
});