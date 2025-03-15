import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userName }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    const action = event.target.href;
    document.querySelector('.logout-form').action = action;
    document.querySelector('.logout-form').submit();
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small" style={{ fontWeight: 700 }}>Hi! {userName}</span>
          </a>
          {/* Dropdown - User Information */}
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <Link className="dropdown-item" to="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Thông tin cá nhân
            </Link>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" onClick={handleLogout} id="logout" href="/logout">
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Đăng xuất
            </a>
            <form action="" method="POST" className="logout-form">
              {/* Add CSRF token here if needed */}
            </form>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;