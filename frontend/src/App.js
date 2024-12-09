import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './pages/Footer';
import UserList from './pages/UserList';
import Contact from './pages/Contact';
import BookingList from './pages/BookingList';
import AdminDashboard from './Admin/AdminDashboard';
import AdminLogin from './Admin/AdminLogin';
import AdminRegister from './Admin/AdminRegister';
import ProtectedRoute from './Admin/ProtectedRoute';
import AboutUs from './pages/Aboutus';
import History from './pages/History'; // Import the History component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/bookinglist" element={<BookingList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/history" element={<History />} /> Add route for booking history

          {/* Admin */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
              
            } 
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
