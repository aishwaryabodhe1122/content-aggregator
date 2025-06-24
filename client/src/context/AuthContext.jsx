import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const register = async (name, email, password) => {
    await API.post('/auth/register', { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
          console.log("Fetched user:", res.data); 
        } catch {
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
