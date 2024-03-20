// HomePage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { register } from './App/userSlice';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled (this is extra validation, the required attribute on each input already ensures this)
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

   //printinf form data
    console.log('Form Data Submitted:', formData);

    
    localStorage.setItem('registeredUser', JSON.stringify(formData));

    if (formData.password === formData.confirmPassword) {
        dispatch(register({
          name: formData.name,
          email: formData.email,
          password: formData.password, 
        }));
    }
  alert("Registration successful! Please log in.");

  
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 h-full ">
      <div className="bg-white  shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 backdrop-blur-lg bg-white">
        <h2 className="text-gray-700 text-lg font-semibold mb-4">Register As User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input required onChange={handleChange} value={formData.name} name="name" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input required onChange={handleChange} value={formData.email} name="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input required onChange={handleChange} value={formData.password} name="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input required onChange={handleChange} value={formData.confirmPassword} name="confirmPassword" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
          </div>
          <div className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
