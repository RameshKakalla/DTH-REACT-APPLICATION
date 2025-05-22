import './App.css';
import TopNavbar from './components/TopNavbar';
import SideNavbar from './components/SideNavbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiRegistrationForm from './Registration/MultiRegistrationForm';
import Customers from './CustomersDetails/Customers';

function App() {
  return (
    <div className="App">
    <TopNavbar />
    <SideNavbar />
    <div style={{ marginLeft: '220px', marginTop: '60px', padding: '20px' }}>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/abc" element={<MultiRegistrationForm />} />
        <Route path="/Customers" element={<Customers />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  </div>
  );
}

export default App;
