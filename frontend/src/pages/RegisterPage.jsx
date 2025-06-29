import React from 'react'

const RegisterPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-6 text-center'>Create Account</h2>
        <form className='space-y-6'>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
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
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                required
                placeholder="Choose a username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
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
                placeholder="Create a password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be at least 8 characters long and include at least one number, one lowercase and one uppercase letter"
                className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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