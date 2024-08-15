import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import JoblyApi from "../api";
import JobCard from "../jobs/JobCard";
import Loading from "../shared/Loading";

/**
 * UserJobs component displays jobs user has applied to on profile
 * Display toggles based on state in parent, UserProfile component
 * State: jobs, jobsLoaded
 * Fetches job data based on job ids in currUser.applications
 */
function UserJobs(){
    const { currUser } = useContext(UserContext);

    const [jobs, setJobs] = useState(null)
    const [jobsLoaded, setJobsLoaded] = useState(false);

    // function fetches data on individual job
    async function getJobData(jobId){
        const job = await JoblyApi.getJob(jobId)
        return job;
    }

    // upon load, makes API get requests on all jobIds to get full job data
    // re-run when currUser.application changes

    useEffect(function fetchUserJobs () {
        async function getUserJobs (){
            const jobsData = await Promise.all(currUser.applications.map(id => getJobData(id)));
            setJobs(jobsData)
            setJobsLoaded(true)
        }
        setJobsLoaded(false);
        getUserJobs();
    }, [currUser.applications])
    
    if (!jobsLoaded) return <Loading />
   
    return(
        <div>
            {jobs.map(job => (<JobCard key={job.id} job={job}/>))}
        </div>
    )
}

export default UserJobs;