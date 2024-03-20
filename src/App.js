
import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import TechSupport from './Components/TechSupport';
import AdminDashboard from './Components/AdminDashboard';
import Footer from './Components/Footer';



function App() {
  return (
    <div className='bg-gray-200'>
    <Router> 
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/techsupport' element={<TechSupport />}/>
            <Route path='/admindashboard' element={<AdminDashboard />}/>
          </Routes>
        <Footer />
    </Router>
    </div>
  );
}

export default App;
