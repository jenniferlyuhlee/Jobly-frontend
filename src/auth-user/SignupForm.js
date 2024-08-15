import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import Alert from "../shared/Alert";

/**
 * SignupForm component
 * Props: signup
 * - When submitted, calls signup function prop from App.js
 * - Redirects user to user homepage
 * State: formData, formErrors
 * - manages form state
 * - manages form errors to display if unsuccessful submit/bad request made
 */
function SignupForm( {signup} ){
    const initialState = {
        username:"",
        password:"",
        firstName:"",
        lastName:"",
        email:""
    }

    // hooks called unconditionally
    // const {currUser} = useContext(UserContext);
    const navigate = useNavigate();
    // states: formData, formErrors
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([])

    // // conditional rendering - redirects logged in users to homepage
    // if(currUser){
    //     return <Navigate to="/" />
    // }

    // general callback to update targeted form data
    function handleChange (e) {
		const { name, value } = e.target;
		setFormData(data => ({...data, [name]: value}))
    }
    
    // form submission handler
    async function handleSubmit(e){
        e.preventDefault();
        let result = await signup(formData);
        if(result.success){
            navigate("/");
        }
        else{
            setFormErrors(result.err);
        }
    }

    return(
        <div className="SignupForm card p-4 my-5 col-lg-10 mx-auto">
            <h1 className="text-center mb-2">Signup</h1>
            <small className="text-center mb-4">
                Make and account with Jobly to access amazing opportunities!
            </small>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">
                        Username
                    </label>
                    <div className="col-sm-9 ">
                        <input
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-9">
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">
                        First Name
                    </label>
                    <div className="col-sm-9">
                        <input
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-3 col-form-label">
                        Last Name
                    </label>
                    <div className="col-sm-9">
                        <input
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-9">
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {formErrors.length>0? 
                    <Alert type="danger" messages={formErrors}/>
                    :
                    null
                }
                <div className="text-center">
                    <button className="btn btn-tertiary">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;