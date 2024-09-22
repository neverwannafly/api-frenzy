import React from 'react';
import { Route, Routes } from 'react-router-dom';

import withLogin from '@app/hoc/withLogin';

import Home from './home';
import NewFunction from './new';
import EditFunction from './edit';
import ViewFunction from './view';

function Functions() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewFunction />} />
      <Route path="/:slug/edit" element={<EditFunction />} />
      <Route path="/:slug/" element={<ViewFunction />} />
    </Routes>
  );
}

export default withLogin(Functions);
