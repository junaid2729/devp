import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import ComPage from './components/ComPage';
import UserList from './components/UserList'; // Ensure filename matches the import
import Contact from './components/Contact'; // Ensure filename matches the import
import BookingList from './components/Bookinglist'; // Ensure filename matches the import

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} /> {/* Default route */}
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ComPage" element={<ComPage />} />
          <Route path="/users" element={<UserList />} /> {/* Route for UserList */}
          <Route path="/bookinglist" element={<BookingList />} /> {/* Correct route for BookingList */}
          <Route path="/contact" element={<Contact />} /> {/* Route for Contact */}
          {/* Add more protected routes here if needed */}
        </Routes>
        <Footer /> {/* Add Footer here to appear on all pages */}
      </Router>
    </AuthProvider>
  );
}

export default App;
