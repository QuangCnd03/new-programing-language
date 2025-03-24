import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

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


export default Sidebar;