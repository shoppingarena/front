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

    try {
      const response = await axios.get(`http://localhost:3000/check-domain`, {
        params: { domain },
      });
      setResult(response.data); // Store the API response
    } catch (err) {
      setError('Failed to fetch domain data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Domain Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g., example.com)"
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Search Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
