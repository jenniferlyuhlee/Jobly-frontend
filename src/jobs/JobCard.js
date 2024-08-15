import React, {useState, useEffect, useContext} from "react";
import UserContext from "../auth-user/UserContext";

/**
 * Individual card component (rendered in JobList, CompanyDetail)
 * Shows info about job
 * Props: {job: id, title, ...}
 * State: applied
 * Calls applyToJob func from parent component to change state
 * and display of applied jobs
 */

function JobCard({job}){
    const { applyToJob, hasAppliedToJob } = useContext(UserContext);
    const [applied, setApplied] = useState(false);

    useEffect(function updateAppliedStatus(){
        setApplied(hasAppliedToJob(job.id));
    }, [job.id, hasAppliedToJob]);

    // Handles applying to a job
    async function handleApply(){
        applyToJob(job.id);
        setApplied(true);
    }

    // conditionals for showing empty salary/equity fields
    let nf = new Intl.NumberFormat();
    const salary = job.salary? nf.format(+job.salary) : "N/A"
    const equity = job.equity? job.equity : "N/A"

    return(
        <div className="JobCard card p-4 m-4">
            <h6 className="card-title">{job.title}</h6>
            <div>
                <a href={`companies/${job.companyHandle}`} className="primary">
                    <i>{job.company !== undefined ? job.company.name : job.companyName}</i>
                </a>
            </div>
            <div className="card-body">
                <p>Salary(USD): {salary}
                <br/>
                Equity: {equity}</p>
            </div>

            <button onClick={handleApply} 
                    className={`btn ${applied ? "btn-secondary" : "btn-primary"}`}
                    disabled={applied}>
                {applied ? "Applied" : "Apply" }
            </button>
        </div>
    )
}   
export default JobCard;