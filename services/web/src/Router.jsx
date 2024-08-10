import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
const HomePage = lazy(() => import('@app/pages/home'));
const AboutPage = lazy(() => import('@app/pages/about'));
const DashboardPage = lazy(() => import('@app/pages/dashboard'));

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
      <Route
        path="/dashboard/*"
        element={<DashboardPage />}
      />
    </Routes>
  );
}

export default AppRouter;
