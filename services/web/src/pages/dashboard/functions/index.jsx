import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './home';
import NewFunction from './new';

function Functions() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewFunction />} />
      {/* <Route path="jobs" element={<BackgroundJobs />} /> */}
      {/* <Route path="workspaces" element={<Workspaces />} /> */}
    </Routes>
  );
}

export default Functions;
