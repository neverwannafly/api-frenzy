import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './home';
import NewFunction from './new';
import EditFunction from './edit';

function Functions() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewFunction />} />
      <Route path="/:slug/edit" element={<EditFunction />} />
    </Routes>
  );
}

export default Functions;
