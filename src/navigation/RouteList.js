import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../home/Home";
import CompanyList from "../companies/CompaniesList";
import CompanyDetails from "../companies/CompanyDetail";
import JobsList from "../jobs/JobsList";
import ProfileForm from "../auth-user/ProfileForm";
import LoginForm from "../auth-user/LoginForm";
import SignupForm from "../auth-user/SignupForm"

/**
 * Jobly Routes
 * Props: login & signup handling functions inherited from App.js
 * Contains protected routes that check for currUser in state
 */

function RouteList({login, signup}){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/companies" 
                    element={<ProtectedRoute element={<CompanyList />} />} 
                />
                <Route path="/companies/:handle" 
                    element={<ProtectedRoute element={<CompanyDetails />} />}   
                />
                <Route path="/jobs"
                    element={<ProtectedRoute element={<JobsList />} />}   
                />
                <Route path="/profile"
                    element={<ProtectedRoute element={<ProfileForm />} />}   
                />
                <Route path="/signup" element={<SignupForm signup={signup}/>} />
                <Route path="/login" element={<LoginForm login={login}/>} />
                <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
        </div>
    )
}

export default RouteList;