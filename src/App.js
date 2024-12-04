import React, { useState } from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import axios from 'axios';

function App() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (domain) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get(`/check-domain`, {
        params: { domain },
      });
      setResult(response.data); // Store the API response
    } catch (err) {
      setError('Message from App.js: "Failed to fetch domain data. Please try again."');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Domain Search</h1>
      <SearchForm onSearch={handleSearch} setDomain={setDomain} domain={domain} />
      <SearchResults result={result} loading={loading} error={error} />
    </div>
  );
}

export default App;
