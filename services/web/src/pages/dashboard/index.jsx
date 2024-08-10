import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './home';
import Functions from './functions';

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/functions/*" element={<Functions />} />
      {/* <Route path="jobs" element={<BackgroundJobs />} /> */}
      {/* <Route path="workspaces" element={<Workspaces />} /> */}
    </Routes>
  );
}

export default Dashboard;
