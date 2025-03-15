import { useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  return (
    <ul className="nav nav-pills flex-column" style={{ border: 0 }}>
      <li className="nav-item">
        <a className={`nav-link  ${location.pathname === '/my-profile' ? 'active' : ''}`} href="/my-profile">Information</a>
      </li>
      <li className="nav-item">
        <a className={`nav-link  ${location.pathname === '/my-courses' ? 'active' : ''}`} href="/my-courses">My courses</a>
      </li>
      <li className="nav-item">
        <a className={`nav-link  ${location.pathname === '/my-orders' ? 'active' : ''}`} href="/my-orders">My orders</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Logout</a>
      </li>
    </ul>
  );
};

export default Menu;