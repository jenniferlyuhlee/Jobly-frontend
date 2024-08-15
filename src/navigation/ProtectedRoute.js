import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../auth-user/UserContext";



function ProtectedRoute({ element}){
    const {currUser} = useContext(UserContext);

    if(!currUser){
        return <Navigate to="/login" />
    }

    return element;
}

export default ProtectedRoute;