import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api';

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q');
  console.log("Search query:", query);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      API.get(`/search?q=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.error('Search error', err));
    }
  }, [query]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Search results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        results.map((r, idx) => (
          <div key={idx} style={{ marginBottom: 20 }}>
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <a href={r.url} target="_blank" rel="noreferrer">Read More</a>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
