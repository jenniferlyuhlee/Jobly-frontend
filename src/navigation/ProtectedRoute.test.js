import React from 'react';
import {render} from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../testConfigs/testSetup';
import ProtectedRoute from './ProtectedRoute';
import CompanyList from '../companies/CompaniesList';

it("renders without crashing" , function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <ProtectedRoute />
            </UserProvider>
        </MemoryRouter>
    );
});

it("matches snapshot when logged in", function () {
    const {asFragment} = render(
        <MemoryRouter>
            <UserProvider>
                <ProtectedRoute element={CompanyList}/>
            </UserProvider>
        </MemoryRouter>
    );
    
    expect(asFragment()).toMatchSnapshot();
});

it ('matches snapshot when logged out', function () {
    const {asFragment} = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <ProtectedRoute element={CompanyList} />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
