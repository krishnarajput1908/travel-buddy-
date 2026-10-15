import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from '../components/Toast';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
