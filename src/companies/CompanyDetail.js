import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JoblyApi from "../api";
import JobCard from "../jobs/JobCard";
import Loading from "../shared/Loading";

function CompanyDetails() {
    const { handle } = useParams();
    // set to null to use loading spinner
    const [company, setCompany] = useState(null);
    // error state for invalid param company handles
    const [error, setError] = useState(false);

    useEffect(function getCompanyDetails() {
        async function getCompany(){
            try{
                setCompany(await JoblyApi.getCompany(handle));
            }
            catch(err){
                console.error("Company not found")
                setError(true)
            }
        }
        getCompany();
    }, [handle]);

    if(error) return <p className="text-center m-4">Sorry, this company could not be found.</p>

    if (!company) return <Loading />
    
    return (
        <div className="CompanyDetail mt-4">
            <div className="row">
                <img className="col-2"src={company.logoUrl}/>
                <div className="col-10">
                    <h3>{company.name}</h3>
                    <p>{company.description}</p>
                    <p>Size: {company.numEmployees} employees</p>
                </div>
            </div>
            <h5 className="mx-4 my-3">Available Jobs:</h5>
            {company.jobs ? (
                company.jobs.map(j => <JobCard key={j.id} job={j} />)
            ) : (
                <p>No jobs available.</p>
            )}
        </div>
    )
}

export default CompanyDetails;