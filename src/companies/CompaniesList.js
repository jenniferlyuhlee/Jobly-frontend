import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import Loading from "../shared/Loading"
import SearchForm from "../shared/SearchForm";
import CompanyCard from "./CompanyCard";


function CompanyList () {
    const [companies, setCompanies] = useState(null);

    // gets all companies on mount
    useEffect(function fetchCompanies(){
        searchCompanies();
    }, []);

    // search form submission that filters & re-renders companies list
    async function searchCompanies(name){
        setCompanies(await JoblyApi.getCompanies(name));
    }

    if(!companies){
        return(<Loading />)
    }

    return (
        <div>
            <SearchForm searchFor={searchCompanies} 
                        placeholder={'"e.g. Hudson Inc"'}/>
            <p className="m-0 text-center">
                <i>Showing {companies.length} companies</i>
            </p>
            {companies.length > 0 ? 
            <div>
                {companies.map(c => (
                    <CompanyCard key={c.handle} company={c}/>
                ))}
            </div>
            : 
            <p>Sorry, no companies were found.</p>
            } 
        </div>
    )
}

export default CompanyList;