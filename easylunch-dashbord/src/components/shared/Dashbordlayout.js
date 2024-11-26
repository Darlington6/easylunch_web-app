import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

function Dashbordlayout() {
  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='flex-grow flex flex-col'>
        <Header /> {/* If you want to include a header */}
        <div className='flex-grow flex items-center justify-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashbordlayout;
