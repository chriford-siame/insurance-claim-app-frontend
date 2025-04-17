import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CustomLoarder from './components/Loarder';
import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';

const ClaimCreation = React.lazy(() => import('./pages/claim/Create'));
const ClaimView = React.lazy(() => import('./pages/claim/View'));
const ClaimList = React.lazy(() => import('./pages/claim/List'));
const Login = React.lazy(() => import('./pages/auth/Login'));

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="flex justify-center pt-6 pb-16">
        <div className=" md:w-[75%] lg:md:w-[75%] xl:md:w-[75%] text-2xl">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <React.Suspense fallback={
                  <CustomLoarder />
                }>
                  {isAuthenticated ? <ClaimList />: <Navigate to="/login" />}
                </React.Suspense>
              } />
              <Route path="/claim/add" element={
                <React.Suspense fallback={
                  <CustomLoarder />
                }>
                  {isAuthenticated ? <ClaimCreation />: <Navigate to="/login" />}
                </React.Suspense>
              } />
              <Route path="/claim/:id/view" element={
                <React.Suspense fallback={
                  <CustomLoarder />
                }>
                  {isAuthenticated ? <ClaimView />: <Navigate to="/login" />}
                </React.Suspense>
              } />
              <Route path="/login" element={
                <React.Suspense fallback={
                  <CustomLoarder />
                }>
                  <Login />
                </React.Suspense>
              } />

            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
