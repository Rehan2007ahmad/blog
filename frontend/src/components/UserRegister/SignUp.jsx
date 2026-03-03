import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus} from "react-icons/fa";
import api from '../../lib/axios';
import Cookies from 'js-cookie';
import toast  from "react-hot-toast"; 

const SignUp = () => {
  const navigate = useNavigate()
  let [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })


  const handleChange = (e)=>{
    const {name, value} = e.target
    setInput(perv => ({...perv, [name]:value}))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
     const res =await api.post('/user/register', input)

     toast.success("Signup successful! 🎉");
     const {token, user} = res.data
     Cookies.set('auth_token', token, {expires:7})
     Cookies.set('Name', user.firstName, {expires:7})

      setInput({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })

    if(user.role === 'admin'){
      navigate('/admin')
    }
    else if (user.role === 'editor'){
      navigate('editor')
    }
    else{
      navigate('/')
    }
 
    } catch (error) {
      toast.error("Signup failed. Please try again.", error);
    }
  
  }

 
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-indigo-600">
              Insight<span className="text-gray-800">Blog</span>
            </h1>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join our community and start sharing your insights
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400"/>
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={handleChange}
                      value={input.firstName}
                      autoComplete="given-name"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400"/>
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      onChange={handleChange}
                      value={input.lastName}
                      type="text"
                      autoComplete="family-name"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope  className="text-gray-400"/>
                  </div>
                  <input
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock  className="text-gray-400"/>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={input.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="Create a password"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer mt-6"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaUserPlus  className="text-indigo-300 group-hover:text-indigo-200 text-xl"/>
                </span>
                Create Account
              </button>
            </div>
            <div className="text-center text-sm mt-4">
              <span className="text-gray-600">Already have an account?</span>{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign in
              </Link>
            </div>           
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp
