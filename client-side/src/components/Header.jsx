import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import { useStudentProfile } from "../hook/hook";
import { useCart } from "../components/cart/CartContext";
import "../styles/Header.css";

const Header = () => {
  const user = useStudentProfile();
  const { clearAllItems, cartCount } = useCart();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      clearAllItems();
      await axios.post("/logout");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/images/client/page-logo.png" alt="Logo" />
          <span>EduLearn</span>
        </Link>

        <nav className="nav-menu">
          <div className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i>
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/courses" className="nav-link">
              <i className="fas fa-tv"></i>
              New Courses
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/map" className="nav-link">
              <i className="fas fa-route"></i>
              Map
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/knowledge" className="nav-link">
              <i className="fas fa-globe-europe"></i>
              Knowledge
            </Link>
          </div>
        </nav>

        <div className="user-menu">
          <Link to="/cart" className="nav-link">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="item-count">{cartCount}</span>}
          </Link>
          {user ? (
            <div className="user-avatar">
              <i className="fas fa-user-circle"></i>
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-name">Hi! {user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <div className="user-actions">
                  <Link to="/my-profile" className="user-action-item">
                    <i className="fas fa-user"></i>
                    Profile
                  </Link>
                  <a href="#" className="user-action-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/sign-up" className="nav-link">
                <i className="fas fa-user"></i>
                Sign up
              </Link>
              <Link to="/sign-in" className="nav-link">
                <i className="fas fa-key"></i>
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
