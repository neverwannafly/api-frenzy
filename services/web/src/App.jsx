import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import store from '@app/store';
import theme from '@app/constants/theme';
import Loader from '@app/components/Loader';
import ToastHandler from '@app/components/ToastHandler';
import { getAuthToken } from '@app/lib/auth';
import Header from '@app/components/navbar';
import Footer from '@app/components/Footer';
import { loadUser, MARK_USER_SET } from '@app/store/user';
import AuthForm from '@app/components/auth';

import AppRouter from './Router';

import './style/index.scss';

function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getAuthToken()) {
      dispatch(loadUser());
    } else {
      dispatch({ type: MARK_USER_SET });
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
      <AuthForm />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
          <ToastHandler />
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
