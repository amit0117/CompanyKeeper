import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader } from '@mantine/core';
import Header from './components/header';

// Lazy loading components
const Login = React.lazy(() => import('./components/Login'));
const Home = React.lazy(() => import('./components/Home'));
const CompanyScreen = React.lazy(() => import('./screen/CompanyScreen'));

function App() {
  return (
    <>
      <Header />
      <Router>
        <ErrorBoundary>
          <Suspense fallback={
            <div className='w-full h-screen mx-[50%] my-14'><Loader color="blue" /></div>
          }
          >
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/company" element={<CompanyScreen />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
