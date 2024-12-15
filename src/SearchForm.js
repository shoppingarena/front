import React from 'react';

function SearchForm({ onSearch, setDomain, domain }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (domain) {
            onSearch(domain);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter domain (e.g., example.com)"
                className="input"
            />
            <button type="submit" className="button">
                Search
            </button>
        </form>
    );
}

export default SearchForm;