import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import SearchResults from "./pages/SearchResults"; 
import { useAuth } from "./context/AuthContext";


const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/home" />} />
        <Route path="/search" element={token ? <SearchResults /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

