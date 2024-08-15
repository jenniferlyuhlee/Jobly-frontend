import React, { useState } from "react";

/**
 * SearchForm for filtering through company/job results
 * Props: placeholder, searchFor func
 * - searchFor makes filtering request to database and changes state
 * of companies [] or jobs [] 
 */
function SearchForm({searchFor, placeholder}) {
    const [searchQuery, setSearchQuery] = useState("");

    // general callback to update targeted form data
    function handleChange (e) {
		setSearchQuery(e.target.value)
    }

    // form submission handler calls filtering on parent
    function handleSubmit (e) {
        e.preventDefault();
        // manage spaces or empty queries
        searchFor(searchQuery.trim() || undefined)
        setSearchQuery(searchQuery.trim())
    }
    
    return (
        <div className="my-4">
            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div>
                    <input 
                            name="searchQuery" 
                            type="search"
                            className="form-control"
                            placeholder={placeholder}
                            value={searchQuery}
                            onChange={handleChange}/>
                </div>
                <button className="btn btn-tertiary mx-2">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchForm;