// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, logout } = useAuth();
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
                    {user?.name && (
                        <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                            👋 Hi, {user.name}
                        </p>
                    )}
                </div>
                {/* Sidebar */}
                <div style={{ width: '250px', background: '#f0f0f0', padding: '20px' }}>
                    <h2>Categories</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><a href="/home">All</a></li>
                        <li><a href="/home?category=Technology">Technology</a></li>
                        <li><a href="/home?category=Business">Business</a></li>
                        <li><a href="/home?category=Health">Health</a></li>
                        <li><a href="/home?category=Sports">Sports</a></li>
                        <li><a href="/bookmarks">Bookmarks</a></li>
                    </ul>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {/* <button onClick={() => navigate('/bookmarks')}>🔖 Bookmarks</button> */}
                        <button onClick={logout}>🔓 Logout</button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h1 style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>Personalized Content Aggregator</h1>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
