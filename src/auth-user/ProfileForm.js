import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import JoblyApi from "../api";
import Alert from "../shared/Alert";
import UserJobs from "./UserJobs";

/**
 * Profile Component - shows form to edit profile info
 * State: formData, formErros, saveConfirmed, showProfile
 * Inherits currUser data and state from parent to make user changes
 * Inherits logout function to logout when account deleted
 * Toggles display between profile and jobs user applied to, UserJobs component
 */

function ProfileForm(){
    const {currUser, setCurrUser, logout} = useContext(UserContext);

    // states: formData, formErrors, saveConfirmed, showProfile, showAppliedJobs
    const [formData, setFormData] = useState({
        username: currUser.username,
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
    });
    const [formErrors, setFormErrors] = useState([])
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    const [settingErrors, setSettingErrors] = useState(null);
    const [showProfile, setShowProfile] = useState(true);
    
    // general callback to update targeted form data
    function handleChange (e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value}));
        setFormErrors([]);
    }

    // form submission handler
    async function handleSubmit(e){
        e.preventDefault();

        const profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        }
        let updatedUser;

        try{
            updatedUser=await JoblyApi.updateProfile(formData.username, profileData);
        }
        catch(err){
            setFormErrors(err)
            return;
        }

        // resets profile form to display updated info
        setFormData(f => ({...f}));
        setFormErrors([]);
        setSaveConfirmed(true);
        setCurrUser(updatedUser);
    }

    // delete user handler
    async function handleDelete(){
        try{
            const deleted = await JoblyApi.deleteUser(currUser.username)
            if (deleted){
                logout()
            }
        }
        catch(err){
            setSettingErrors(err)
            return 
        }
    }

    // toggle profile/applied jobs display 
    function toggleDisplay(){
        setShowProfile(state => !state)
    }

        return(
            <>
            <div className="d-flex justify-content-around m-3">
                <button onClick={toggleDisplay} 
                className={`btn btn-tab ${showProfile? "tertiary active-tab": "primary"}`}>
                    My Profile
                </button>
            
                <button onClick={toggleDisplay} 
                className={`btn btn-tab ${showProfile? "primary": "tertiary active-tab"}`}>
                    My Applications
                </button>
            </div>
            {showProfile ? 
            <div className="SignupForm card p-4 my-3 col-lg-10 mx-auto">
                {/* Profile Info Update Form */}
                <h3 className="text-center mb-3">Edit Profile</h3>
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
                                readOnly
                                disabled
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
                        <label className="col-sm-3 col-form-label">
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
                        <Alert type="danger" messages={formErrors} />
                        :
                        null
                    }
                    {saveConfirmed?
                        <Alert type="success" messages={["Updated successfully."]} />
                        :
                        null
                    }
                    <div className="text-center">
                        <button className="btn btn-success">Save Changes</button>
                    </div>
                </form>
                {/* Profile Settings */}
                <h3 className="m-3 text-center">Settings</h3>
                {settingErrors? 
                    <Alert type="warning" messages={["Unable to proceed with your request. Try again later."]} />
                    :
                    null}
                <div className="text-center">
                    <button onClick={handleDelete} className="btn btn-danger">
                        Delete Account
                    </button>
                </div>
            </div>
            : 
            <UserJobs />
            }
            </>
        )
}

export default ProfileForm;