import React, { useState, useContext, useEffect } from 'react'
import PasswordBar from '../components/input/PasswordBar'
import EmailBar from '../components/input/EmailBar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'


const LoginPage = () => {

  const auth = useContext(AuthContext);
  const { login } = auth;
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginButton = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      await login(email, pwd)
      navigate("/")
    }
    catch(error){
      console.log(error);
      alert(error?.response?.data?.message)
    }
    finally{
      setIsLoading(false);
    }  
  }

    
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Login</h2>
        <form className='space-y-6' onSubmit={loginButton}>
          {/* Email */}
          <EmailBar placeholder="Enter your email" update={(e) => setEmail(e.target.value)} email={email}/>

          {/* Password */}
          <PasswordBar label="Password" svg={true} placeholder="Enter your password" update={(e) => setPwd(e.target.value)} pwd={pwd}/>

          <button 
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded w-full mb-6'
            disabled={isLoading}
          >
            {isLoading ? "" : "Login"}
            {isLoading && (<span className="loading loading-spinner loading-xs"></span>)}
          </button>
          <p className="text-sm text-center">
            <a href='/forgot' className='text-blue-500 hover:underline font-medium'>
            Forgot your username or password?
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage