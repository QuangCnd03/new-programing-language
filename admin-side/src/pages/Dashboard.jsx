import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
const Dashboard = () => {
  usePageTitle('Dashboard');
  return (
    <div>
      <div>Dashboard Content</div>
    </div>
  );
};

export default Dashboard;