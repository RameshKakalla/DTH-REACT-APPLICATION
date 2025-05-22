import React from 'react';
import '../css/SideNavbar.css';
import { Home, Users, Tv, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
  return (
    <section className="side-navbar open">
      <div className="sidebar-header">
        <h3>DTH Admin</h3>
      </div>

      <nav className="nav-links">
        <Link to="/"><Home className="nav-icon" /> HomePage</Link>
        <Link to="/Customers"><Users className="nav-icon" /> Customers</Link>
        <Link to="/abc"><Tv className="nav-icon" /> Registration</Link>
        <Link to="/settings"><Settings className="nav-icon" /> Settings</Link>
      </nav>

      <div className="logout">
        <Link to="/logout"><LogOut className="nav-icon" id='log'/> Logout</Link>
      </div>
    </section>
  );
};

export default SideNavbar;
