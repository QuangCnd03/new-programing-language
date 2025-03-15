import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">ATX Management</div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <Link className="nav-link" to="/admin/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading"></div>

      {/* Menu Items */}
      <MenuItem title="Orders" name="orders" except={1} />
      <hr className="sidebar-divider" />
      <MenuItem title="Students" name="students" />
      <MenuItem title="Users" name="users" />
      <MenuItem title="Teachers" name="teachers" />

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading"></div>

      <MenuItem title="Categories" name="categories" />
      <MenuItem title="Courses" name="courses" includes={['/admin/lessons/*']} />

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

const MenuItem = ({ title, name, except, includes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="nav-item">
      <a className="nav-link collapsed" href="#" onClick={toggleMenu} aria-expanded={isOpen} aria-controls={`collapse${name}`}>
        <i className="fas fa-fw fa-wrench"></i>
        <span>{title}</span>
      </a>
      <div id={`collapse${name}`} className={`collapse ${isOpen ? 'show' : ''}`} aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          {except ? (
            <Link className="collapse-item" to={`/admin/${name}`}>List</Link>
          ) : (
            <>
              <Link className="collapse-item" to={`/admin/${name}`}>List</Link>
              <Link className="collapse-item" to={`/admin/${name}/create`}>Add new</Link>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default Sidebar;