import React from 'react'
import EmailBar from '../components/EmailBar'
import UsernameBar from '../components/UsernameBar'
import PasswordBar from '../components/PasswordBar'

const RegisterPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-6 text-center'>Create Account</h2>
        <form className='space-y-6'>
          {/* Email */}
          <EmailBar placeholder="Enter your email"/>

          {/* Username */}
          <UsernameBar prompt="Create a username"/>

          {/* Password */}
          <div>
              <PasswordBar label="New Password" svg={true} placeholder="Create a password"/>
              <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters with a number and both lowercase and uppercase letters
              </p>
          </div>


          <button 
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Create Account
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