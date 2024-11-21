import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get(`https://check.shoppingarena.net:3001/check-domain`, {
        params: { domain },
      });
      setResult(response.data); // Store the API response
    } catch (err) {
      setError('Failed to fetch domain data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const lines = result.split('\n').filter((line) => line.trim() !== ''); // Parse lines
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
  };

  return (
    <div className="container">
      <h1>Domain Search</h1>
      <form onSubmit={handleSearch}>
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

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {renderResult()}
    </div>
  );
}



export default App;
