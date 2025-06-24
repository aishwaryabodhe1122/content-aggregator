import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      API.get('/user/bookmarks', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => setBookmarks(res.data));
    }
  }, [token]);

  const remove = async (url) => {
    await API.delete('/user/bookmarks', {
      headers: { Authorization: `Bearer ${token}` },
      data: { url },
    });
    setBookmarks(bookmarks.filter(b => b.url !== url));
  };

  const totalPages = Math.ceil(bookmarks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookmarks = bookmarks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Bookmarks</h2>

      {currentBookmarks.length === 0 ? (
        <p>No bookmarks to display.</p>
      ) : (
        currentBookmarks.map((b, idx) => (
          <div key={idx} style={{ marginBottom: 20 }}>
            <h3>{b.title}</h3>
            <p>{b.description}</p>
            <a href={b.url} target="_blank" rel="noreferrer">Read More</a>
            <button onClick={() => remove(b.url)} style={{margin: '0 2%'}}>❌ Remove</button>
          </div>
        ))
      )}

      <div style={{ marginTop: 20 }}>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>{'< Previous'}</button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{ margin: '0 5px', fontWeight: currentPage === page ? 'bold' : 'normal' }}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>{'Next >'}</button>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <Link to="/home">
          <button>⬅ Back to Content</button>
        </Link>
      </div>
    </div>
  );
};

export default Bookmarks;
