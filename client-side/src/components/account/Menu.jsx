import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  return (
    <ul className="nav nav-pills flex-column" style={{ border: 0 }}>
      <li className="nav-item">
        <Link className={`nav-link  ${location.pathname === '/my-profile' ? 'active' : ''}`} to="/my-profile">Information</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link  ${location.pathname === '/my-courses' ? 'active' : ''}`} to="/my-courses">My courses</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link  ${location.pathname === '/my-orders' ? 'active' : ''}`} to="/my-orders">My orders</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link  ${location.pathname === '/change-password' ? 'active' : ''}`} to="/change-password">Change password</Link>
      </li>
    </ul>
  );
};

export default Menu;