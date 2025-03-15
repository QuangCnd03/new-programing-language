import React from 'react';

const PageTitle = ({ pageTitle }) => {
  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">{pageTitle ? pageTitle : 'Empty'}</h1>
    </div>
  );
};

export default PageTitle;