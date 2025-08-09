import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/footer'; // Make sure path is correct
import Header from './header/header'; // Make sure path is correct

function Endlayout() {
  return (
    <div className="layout-container">
      <Header/>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Endlayout;
