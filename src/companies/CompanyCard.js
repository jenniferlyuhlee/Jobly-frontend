import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css"

function CompanyCard ({company}) {
    return(
        <Link to={`/companies/${company.handle}`} className="CompanyCard card">
            <div>
                <h6 className="card-title">{company.name}</h6>
                <div className="card-body">
                    <p>{company.description}</p>
                    <img src={company.logoUrl}
                        alt={company.name}/>
                </div>
            </div>
        </Link>
    )
}

export default CompanyCard;