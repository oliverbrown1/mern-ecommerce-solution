import React from 'react'
import PasswordBar from '../components/input/PasswordBar'

const ResetPasswordPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Change Password</h2>
        <form className='space-y-6'>
            {/* Password */}
            <div>
                <PasswordBar label="New Password" svg={true} placeholder="Create a new password"/>
                <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with a number and both lowercase and uppercase letters
                </p>
            </div>

            <PasswordBar label="Confirm New Password" svg={true} placeholder="Re-enter password"/>
            {/* <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                required
                placeholder="Create a new password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be at least 8 characters long and include at least one number, one lowercase and one uppercase letter"
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters with a number and both lowercase and uppercase letters
            </p>
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                required
                placeholder="Re-enter password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be at least 8 characters long and include at least one number, one lowercase and one uppercase letter"
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div> */}
           
            <button 
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded w-full mb-4'
            >
            Reset Password
            </button>
            <p className="text-sm text-center">
                <a href='/login' className='text-blue-500 hover:underline font-medium'>
                Back to Login
                </a>
            </p>
        </form>
        </div>
    </div>
  )
}

export default ResetPasswordPage