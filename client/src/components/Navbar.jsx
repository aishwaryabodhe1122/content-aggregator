import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery('');
    }
  };

  return (
    <nav style={{
      height: '60px',
      background: '#333',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      fontSize: '20px'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Personalized Content Aggregator
        </Link>
      </div>
      {/* Center: Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={query}
          placeholder="Search news..."
          onChange={e => setQuery(e.target.value)}
          style={{ padding: '6px', borderRadius: '4px', border: 'none' }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '6px' }}>Search</button>
      </form>
      <div>
      {user && (
  <Link to="/bookmarks" style={{ color: 'white', marginRight: 10 }}>Bookmarks</Link>
)}
      </div>
      <div style={{ fontSize: '16px' }}>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: 10 }}>Login</Link>
            <Link to="/register" style={{ color: 'white' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
