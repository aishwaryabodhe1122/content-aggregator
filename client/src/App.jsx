import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import SearchResults from "./pages/SearchResults";
import Bookmarks from './pages/Bookmarks';
import Layout from "./components/Layout";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!token ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/home" />} />

        {/* Protected Routes under Layout */}
        {token && (
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
