import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
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

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Bookmarks</h2>
      {bookmarks.map((b, idx) => (
        <div key={idx} style={{ marginBottom: 20 }}>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
          <a href={b.url} target="_blank" rel="noreferrer">Read More</a>
          <br />
          <button onClick={() => remove(b.url)}>❌ Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
