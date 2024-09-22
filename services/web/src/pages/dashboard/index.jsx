import React from 'react';
import { Route, Routes } from 'react-router-dom';

import withLogin from '@app/hoc/withLogin';

import Home from './home';

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default withLogin(Dashboard);
