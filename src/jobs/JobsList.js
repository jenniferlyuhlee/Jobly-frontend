import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import SearchForm from "../shared/SearchForm";
import JobCard from "./JobCard";
import Loading from "../shared/Loading";

function JobsList(){
    const [jobs, setJobs] = useState(null);

    useEffect(function fetchJobs(){
        searchJobs();
    }, []);

    async function searchJobs(name){
        setJobs(await JoblyApi.getJobs(name));
    }

    if(!jobs){
        return(
            <Loading />
        )
    }
    return(
        <div>
            <SearchForm searchFor={searchJobs}
                        placeholder={'"e.g. architect"'}/>
            <p className="m-0 text-center">
                <i>Showing {jobs.length} open positions</i>
            </p>
            {jobs.length > 0? 
            (<div>
                {jobs.map(j => (
                    <JobCard key={j.id} job={j}/>
                ))}
            </div>)
            :
            <p>Sorry, no jobs were found.</p>
            }
    
        </div>
    )
}

export default JobsList;