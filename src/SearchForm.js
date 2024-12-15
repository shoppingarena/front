import React, { useState } from 'react';


function SearchForm({ onSearch, setDomain, domain }) {

    const [isValid, setIsValid] = useState(true);

    const validateDomain = (value) => {
        const pattern = /^\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b$/;
        setIsValid(pattern.test(value));
        console.log("validateDomain", isValid);
        return isValid;

    };
    const handleChange = (e) => {
        const value = e.target.value;
        validateDomain(value);
        setDomain(value);
        console.log("handleChange", value);

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onSearch(domain);
            console.log("handleSubmit", domain);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={domain}
                onChange={handleChange}
                placeholder="Enter domain (e.g., example.com)"
                className="input"
            />
            <button type="submit" className="button">
                Search
            </button>
            {!isValid && <p style={{ color: 'red' }}>Invalid Domain name</p>}

        </form>
    );
}

export default SearchForm;