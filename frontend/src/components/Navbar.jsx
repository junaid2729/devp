// frontend/src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './navbar.css'; // Import the CSS file

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/Home" className="navbar-link">Home</Link>
        <Link to="/ComPage" className="navbar-link">ComPage</Link>
        <Link to="/about" className="navbar-link">About Us</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
      </div>
      {/* Centered Heading */}
      <div className="navbar-center">
        <h1 className="navbar-heading">Transportation Service</h1>
      </div>
      <div className="navbar-right">
        {user ? (
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
