import React from 'react'
import PasswordBar from '../components/PasswordBar'
import UsernameBar from '../components/UsernameBar'

const LoginPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Login</h2>
        <form className='space-y-6'>
          {/* Username */}
          <UsernameBar prompt="Enter your username"/>

          {/* Password */}
          <PasswordBar label="Password" svg={true} placeholder="Enter your password"/>

          <button 
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded w-full mb-6'
          >
            Submit
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