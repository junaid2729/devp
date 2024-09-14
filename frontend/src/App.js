import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './pages/Footer';
// import ComPage from './pages/ComPage';
import UserList from './pages/UserList';
import Contact from './pages/Contact';
import BookingList from './pages/BookingList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> {/* Default route */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/comPage" element={<ComPage />} /> */}
          <Route path="/users" element={<UserList />} />
          <Route path="/bookinglist" element={<BookingList />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
