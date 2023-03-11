import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { redirect } from 'react-router-dom';
import { isLoggedIn } from '../services/authorize';
import logo from '../logo.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/* 
 **Logi**: 
 Login using the API at `https://freddy.codesubmit.io/login` 
 with POST `{ username: 'freddy', password: 'ElmStreet2019' }`. 

 The login endpoint will return a JWT `access_token` that is valid for 15 minutes 
 and a `refresh_token` which is valid for 30 days. 
 
 Make sure to also handle wrong credentials properly
  */
 
 const Login = (props) => {
	const [loading, setLoading] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    isLoggedIn() && (window.location.href = '/dashboard');
  },[])

	const submitLoginForm = event => {
    console.log(usernameRef)
		setLoading(true);
		event.preventDefault();
		axios
			.post(`${process.env.REACT_APP_API}/login`, {
				username: usernameRef.current.value, //freddy
				password: passwordRef.current.value, //ElmStreet2019
			})
			.then(res => {
				console.log(res);
				setLoading(false);

					Swal.fire({
						icon: 'success',
						title: `Welcome ${usernameRef.current.value}`,
						showCancelButton: false,
						showConfirmButton: false,
						timer: 1000
					}).then(result => {
            // console.log(res.data);
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            window.location.href = `${process.env.PUBLIC_URL}/dashboard`;
          })
			})
			.catch(err => {
        setLoading(false);
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Login Fail',
        });
			});

  }


	return (
    <div className="flex pt-10 min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-[320px] mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row shadow-md rounded-md">
          <div className="px-6 py-6 sm:w-full  flex justify-center ">
            <div className="w-full text-gray-800">
              <div className="py-2">
                <div className='text-center'>
                  <div className="flex justify-between">
                    <div className="text-2xl text-left flex flex-col">
                      <div>Freddy's</div>
                      <div>Artisanal</div>
                      <div>Halloween</div>
                      <div>Candy Shop</div>
                    </div>
                    <img src={logo} width="120"  alt="" />
                  </div>
                  
                </div>
              </div>
              <form className="mt-4 space-y-6"onSubmit={submitLoginForm}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="shadow-sm space-y-6">
                  <div>
                    <label htmlFor="username-address" className="sr-only">
                      Username
                    </label>
                    <input
                      id="username-address"
                      name="username"
                      type="text"
                      autoComplete="username"
                      ref={usernameRef}
                      required
                      className="text-lg appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      ref={passwordRef}
                      required
                      className="text-lg appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className={classNames( loading ? 'cursor-not-allowed opacity-50' : '' ,'group relative w-full flex justify-center btn btn-rose  py-2 px-2 border border-gray-500 shadow-sm text-xl font-normal')}
                    >
                    {
                      loading && (
                        <svg className='animate-spin -ml-1 mr-3 h-8 w-8 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )
                    }
                      Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
	);
};

export default Login;







/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
