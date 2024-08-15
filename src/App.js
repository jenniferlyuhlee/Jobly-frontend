import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"
import JoblyApi from './api';
import useLocalStorageState from './hooks/useLocalStorageState';
import UserContext from './auth-user/UserContext';
import NavBar from './navigation/NavBar';
import RouteList from './navigation/RouteList';
import Loading from './shared/Loading';

function App() {
  // centralized states: user infoLoaded, currUser, token, 
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorageState('jobly-token');
  const [jobsAppliedTo, setJobsAppliedTo] = useState(new Set([]));

  // loads user info from API, runs when user is logged in with auth token
  // re-runs everytime token changes (user logs in)
  useEffect(function getUserInfo (){
    async function getCurrUser(){
      if (token){
        try{
          let {username} = jwtDecode(token);
          JoblyApi.token = token
          let currUser = await JoblyApi.getCurrUser(username);
          setCurrUser(currUser);

          setJobsAppliedTo(new Set(currUser.applications))
        }
        catch(err){
          setCurrUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // controls spinner, lets app wait for successful API data fetch 
    // before rendering correct components
    setInfoLoaded(false);
    getCurrUser();
  }, [token])

  // Handles signup, sets token and logs in new user
  async function signup(data){
    try{
      let token = await JoblyApi.signup(data)
      setToken(token)
      return {success: true};
    }
    catch(err){
      return {success: false, err}
    }
  }

  // Handles login, sets token 
  async function login(data){
    try{
      let token = await JoblyApi.login(data)
      setToken(token)
      return {success: true};
    }
    catch(err){
      return {success: false, err}
    }
  }

  // Logout of site, sets token and currUser to null
  function logout(){
    setCurrUser(null);
    setToken(null);
  }

  // Checks if user already applied to job.
  function hasAppliedToJob(jobId){
    return jobsAppliedTo.has(jobId);
  }

  // Apply to job, adds to state jobsAppliedTo
  async function applyToJob(jobId){
    if (hasAppliedToJob(jobId)) return;
    await JoblyApi.applyToJob(currUser.username, jobId)
    setJobsAppliedTo(new Set([... jobsAppliedTo, jobId]))
    // updates currUser.applications
    setCurrUser(curr => ({...curr, applications: [...curr.applications, jobId]}))
  }

  if (!infoLoaded) return <Loading />
  
  return (
    <UserContext.Provider 
      value = {{currUser, setCurrUser, logout, applyToJob, hasAppliedToJob}}>
      <NavBar />
      <div className='container col-md-8'>
        <RouteList login={login} signup={signup}/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
