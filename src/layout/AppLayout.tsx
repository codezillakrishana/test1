import React, { Component, useEffect, useState } from "react";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";
import { Outlet } from "react-router";
import { useLocation } from 'react-router-dom';

const AppLayout = () => {

  const location = useLocation();
  const [isPageElectionType, setIsPageElectionType] = useState(false);

  useEffect(() => {
    setIsPageElectionType(location.pathname.includes('level'))
  }, [location.pathname.includes('level')])

  return (
    <div id="app-container" >
      <TopNav />
      {!isPageElectionType &&
        <Sidebar />
      }
      <main style={!isPageElectionType ? {
          minHeight: '100vh',
          width: '78vw',
          margin: '0',
          padding: '0',
          float: 'right'
        } : {
          minHeight: '100vh',
          width: '100vw',
          margin: '0',
          padding: '0',
          float: 'right'
        }}>
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
export default AppLayout
