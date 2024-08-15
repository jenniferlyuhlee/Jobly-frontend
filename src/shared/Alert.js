import React from "react";

/**
 * Alert component to display users of form submission result
 * - loops through messages and displays them
 * Props: type('danger', success'), messages []
 */
function Alert({type, messages = []}){
    return(
        <div className={`alert alert-${type}`} role="alert">
            <ul className="m-0">
            {messages.map(err => (
                <li className="small" key={err}>
                    {err}
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Alert;