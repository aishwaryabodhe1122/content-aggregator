import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Sidebar = ({ onCategoryChange }) => {
  const { token } = useAuth();

  const handleClick = async (cat) => {
    onCategoryChange(cat);

    // Save preference if logged in
    if (token && cat !== 'all') {
      try {
        await API.put(
          '/user/preferences',
          { category: cat },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Failed to save preference", err);
      }
    }
  };

  const categories = ['all', 'technology', 'business', 'health', 'sports'];

  return (
    <aside style={{ width: '220px', background: '#f0f0f0', height: 'calc(100vh - 60px)', padding: '20px' }}>
      <div>
        <h3>Categories</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categories.map((cat) => (
            <li key={cat} style={{ marginBottom: 10, cursor: 'pointer' }} onClick={() => handleClick(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
