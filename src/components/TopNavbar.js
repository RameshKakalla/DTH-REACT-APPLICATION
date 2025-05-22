
import React from 'react'
import { Menu, Bell, UserCircle } from 'lucide-react';
import '../css/TopNavbar.css';

const TopNavbar = () => {
  return (
    <header className="top-navbar">
      <div className="navbar-left">
        {/* <Menu className="menu-icon" /> */}
        <h2 className="logo">DTH Admin Panel</h2>
      </div>
      <div className="navbar-right">
        <Bell className="icon" />
        <UserCircle className="icon" />
      </div>
    </header>
  )
}

export default TopNavbar