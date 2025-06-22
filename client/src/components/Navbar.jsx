import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();

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
