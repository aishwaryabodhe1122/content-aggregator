import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const ContentFeed = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let finalCategory = category;

        if (category === 'all' && user?.preferences?.length) {
          finalCategory = user.preferences[user.preferences.length - 1]; // use most recent
        }

        const res = await API.get(`/news?category=${finalCategory}`);
        setArticles(res.data);
      } catch (err) {
        console.error('News fetch error:', err);
      }
    };

    fetchNews();
  }, [category, user]);

  const handleBookmark = async (article) => {
    if (!token) return alert("Login to bookmark");
  
    try {
      await API.post('/user/bookmarks', article, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bookmarked!");
    } catch (err) {
      console.error("Bookmark failed", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>
        {category === 'all' && user?.preferences?.length
          ? 'Based on Your Interests'
          : 'Recommended for You'}
      </h2>

      {articles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        articles.map((a, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <a href={a.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
            <button onClick={() => handleBookmark(a)}>🔖 Bookmark</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ContentFeed;
