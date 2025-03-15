import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DefaultLayout from './components/layouts/DefaultLayout';
import Add from './pages/user/Add';
import List from './pages/user/List';
import Edit from './pages/user/Edit';
function App() {
  return (
    <Routes>
      <Route path="/admin/" element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<List />} />
        <Route path="users/create" element={<Add />} />
        <Route path="users/edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;