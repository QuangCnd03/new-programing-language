import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../parts/Sidebar';
import Header from '../parts/Header';
import Footer from '../parts/Footer';
const DefaultLayout = () => {
  const location = useLocation();
  const pageTitle = location.state?.pageTitle || 'Default Title';
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <Sidebar />
      {/* End of Sidebar */}

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          <Header userName="User Name" />
          {/* End of Topbar */}

          {/* Begin Page Content */}
          <div className="container-fluid">
            {/* Page Heading */}
            <h1 className="h3 mb-0 text-gray-800">{pageTitle}</h1>
            {/* Content */}
            <Outlet />
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}

        {/* Footer */}
        <Footer />
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </div>
  );
};

export default DefaultLayout;