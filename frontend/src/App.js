// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
// import Dashboard from './components/Dasboard';
import Footer from './components/Footer';
import ComPage from './components/ComPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/ComPage" element={<ComPage />} />
        </Routes>
        <Footer /> {/* Add Footer here to appear on all pages */}

      </Router>
    </AuthProvider>
  );
}

export default App;
