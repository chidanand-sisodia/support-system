import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, } from 'react-redux';


// Fixed credentials for demonstration purposes
// const users=useSelector((state)=>state)


// const findUser = users.user.find((item) => item.email = email) ;
  

const TECH_SUPPORT_CREDENTIALS = {
  email: 'techsupport@gmail.com',
  password: 'tech123',
};

const ADMIN_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: 'admin123',
};

const Login = () => {
  const users=useSelector((state)=>state)

  const [loginData, setLoginData] = useState({
    role: 'user',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    console.log("**target",e.target);
    // console.log("**logindata",loginData);
    e.preventDefault();
    const role = loginData.role;
    const currentuser=JSON.parse(localStorage.getItem('registeredUser'));
    console.log("**current user",currentuser);


    const email =loginData.email;
    const findUser = users.user.find((item) => item.email == email) ;
    console.log("**find  user ",findUser);

    let credentials;

    switch (role) {
      case 'user':
        credentials = findUser;
        break;
      case 'supportTech':
        credentials = TECH_SUPPORT_CREDENTIALS;
        break;
      case 'admin':
        credentials = ADMIN_CREDENTIALS;
        break;
      default:
        alert("Invalid role selected.");
        return;
    }

    if (!credentials || credentials.email !== loginData.email || credentials.password !== loginData.password) {
      alert("User does not exist or wrong credentials. Please try again.");
      return;
    }

    alert("Login successful!");

    // Redirect based on role
    switch (role) {
      case 'user':
        navigate('/Dashboard');
        break;
      case 'supportTech':
        navigate('/techsupport');
        break;
      case 'admin':
        navigate('/adminDashboard');
        break;
      default:
        console.log("Unexpected role");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 h-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-700 text-lg font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
            <select name="role" onChange={handleChange} value={loginData.role} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="user">User</option>
              <option value="supportTech">Support Tech</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input required name="email" type="email" onChange={handleChange} value={loginData.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input required name="password" type="password" onChange={handleChange} value={loginData.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          Don't have an account? <Link to="/" className="text-blue-500 hover:text-blue-700">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
