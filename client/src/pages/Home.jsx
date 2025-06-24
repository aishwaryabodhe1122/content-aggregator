import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedUrls, setBookmarkedUrls] = useState([]);
  const itemsPerPage = 5;
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await API.get('/news', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(res.data);
      } catch (err) {
        console.error('Failed to load news:', err);
      }
      setLoading(false);
    };

    const fetchBookmarks = async () => {
      try {
        const res = await API.get('/user/bookmarks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmarkedUrls(res.data.map(item => item.url));
      } catch (err) {
        console.error('Failed to load bookmarks:', err);
      }
    };

    fetchNews();
    fetchBookmarks();
  }, [token]);

  const bookmark = async (article) => {
    try {
      await API.post('/user/bookmarks', article, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarkedUrls(prev => [...prev, article.url]);
    } catch {
      console.error('Bookmark failed');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  return (


    <div style={{ flex: 1, padding: 20 }}>
      <h2>Recommended for You</h2>

      {loading ? (
        <p>Loading...</p>
      ) : currentItems.length === 0 ? (
        <p>No news available</p>
      ) : (
        <>
          {currentItems.map((article, idx) => (
            <div key={idx} style={{ marginBottom: 20 }}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noreferrer">Read More</a>
              <button
                onClick={() => bookmark(article)}
                disabled={bookmarkedUrls.includes(article.url)}
                style={{
                  backgroundColor: bookmarkedUrls.includes(article.url) ? '#00b894' : '#fff',
                  color: bookmarkedUrls.includes(article.url) ? '#fff' : '#000',
                  border: '1px solid #00b894',
                  padding: '6px 10px',
                  margin: '0 2%',
                  cursor: bookmarkedUrls.includes(article.url) ? 'not-allowed' : 'pointer'
                }}
              >
                {bookmarkedUrls.includes(article.url) ? '🔖 Bookmarked' : '📌 Bookmark'}
              </button>
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              &lt; Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
