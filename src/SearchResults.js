import React from 'react';

function SearchResults({ result, loading, error }) {
    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (result) {
        const lines = result.split('\n').filter((line) => line.trim() !== '');
        const data = lines.reduce((acc, line) => {
            const [key, value] = line.split(' = ');
            if (key && value) acc[key.trim()] = value.trim();
            return acc;
        }, {});

        return (
            <div className="result-card">
                <h2>Search Results</h2>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="result-line">
                        <span className="key">{key}:</span>
                        <span className="value">{value}</span>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}

export default SearchResults;
