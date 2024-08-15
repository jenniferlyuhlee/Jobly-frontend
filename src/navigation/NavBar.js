import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth-user/UserContext";
import "./NavBar.css"

function NavBar () {
    const {currUser, logout} = useContext(UserContext);

    return (
        <div className="NavBar">
            <div className="NavBar-left">
                <NavLink className="NavBar-link-left" 
                    to="/">Jobly
                </NavLink>
            </div>
            <div className="NavBar-right">
                {currUser?
                // if user, show logged in navbar
                <div>
                    <NavLink className="NavBar-link-right" 
                    to="/companies">Companies
                    </NavLink>
                    <NavLink className="NavBar-link-right" 
                        to="/jobs">Jobs
                    </NavLink>
                    <NavLink className="NavBar-link-right" 
                        to="/profile">Profile
                    </NavLink>
                    <Link className="NavBar-link-right" 
                        to="/" 
                        onClick={logout}>Logout
                    </Link>  
                </div>  
                :
                // if not user, show default navbar
                <div>
                    <Link className="NavBar-link-right" 
                        to="/login">Login
                    </Link>
                    <Link className="NavBar-link-right" 
                        to="/signup">Sign Up
                    </Link>
                </div>
            }
            </div>
        </div>
    )
}

export default NavBar;