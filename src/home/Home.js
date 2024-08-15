import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth-user/UserContext";


function Home() {
    const {currUser} = useContext(UserContext);


    return (
        <div className="text-center m-5">
            {currUser ? 
            // displays dynamic homepage for logged in users
            <div>
                <h1 className="display-5">
                    Welcome back {currUser.firstName}!
                </h1>
                <h5>All the jobs in one, covenient place.</h5>
                <div className="mt-4">
                    <p className="m-0">
                        See <Link to="/companies" className="tertiary">who's hiring</Link> •
                        Explore <Link to="/jobs" className="tertiary">new roles</Link>
                    </p>
                </div>

            </div>
            :
            // default homepage
            <div>
                <h1 className="display-3">Jobly</h1>
                <h5>All the jobs in one, covenient place.</h5>
                <div className="mt-4">
                    <Link to="/login" className="btn btn-primary m-2">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-primary m-2">
                        Signup
                    </Link>
                </div>
            </div>
        }
            <img src="https://png.pngtree.com/png-vector/20220724/ourmid/pngtree-job-choice-icon-job-symbol-apply-vector-png-image_38124340.png"/>
        </div>


    )
    



}

export default Home;