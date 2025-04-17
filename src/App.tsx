import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomLoarder from './components/Loarder';

const ClaimCreation = React.lazy(() => import('./pages/claim/Create'));
const ClaimView = React.lazy(() => import('./pages/claim/View'));
const ClaimList = React.lazy(() => import('./pages/claim/List'));

function App() {
  return (
    <div className="flex justify-center">
      <div className=" md:w-[75%] lg:md:w-[75%] xl:md:w-[75%] text-2xl">
        {/* <Navbar /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <React.Suspense fallback={
                <CustomLoarder />
              }>
                <ClaimList />
              </React.Suspense>
            } />
            <Route path="/claim/add" element={
              <React.Suspense fallback={
                <CustomLoarder />
              }>
                <ClaimCreation />
              </React.Suspense>
            } />
            <Route path="/claim/:id/view" element={
              <React.Suspense fallback={
                <CustomLoarder />
              }>
                <ClaimView />
              </React.Suspense>
            } />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
