import React, { useState } from 'react'
import EmailBar from '../components/input/EmailBar'
import UsernameBar from '../components/input/UsernameBar'
import PasswordBar from '../components/input/PasswordBar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const response = await axios.post("http://localhost:3001/auth/signup", {
        email : email,
        user: user,
        pwd: pwd
      });
      console.log(response.data);
      // store token
      // response.data.token
      navigate("/login");
    }
    catch(error){
      console.log(error);
      alert(error.response.data.message);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-6 text-center'>Create Account</h2>
        <form className='space-y-6' onSubmit={register}>
          {/* Email */}
          <EmailBar placeholder="Enter your email" update={(e) => setEmail(e.target.value)} email={email}/>

          {/* Username */}
          <UsernameBar prompt="Create a username" update={(e) => setUser(e.target.value)} user={user}/>

          {/* Password */}
          <div>
              <PasswordBar label="New Password" svg={true} placeholder="Create a password" update={(e) => setPwd(e.target.value)} pwd={pwd}/>
              <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters with a number and both lowercase and uppercase letters
              </p>
          </div>


          <button 
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            disabled={isLoading}
          > 
            {isLoading ? "" : "Create Account"}
            {isLoading && (<span className="loading loading-spinner loading-xs"></span>)}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href='/login' className='text-blue-500 hover:underline font-medium'>
              login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage