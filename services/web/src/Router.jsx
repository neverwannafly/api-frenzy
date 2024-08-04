import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './NotFound';

// Pages
const HomePage = lazy(() => import('@app/pages/home'));
const AboutPage = lazy(() => import('@app/pages/about'));

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/about"
        element={<AboutPage />}
      />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
