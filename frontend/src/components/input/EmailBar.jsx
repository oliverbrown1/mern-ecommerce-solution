import React from 'react'

const EmailBar = ({placeholder, email, update}) => {
  return (
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
            placeholder={placeholder}
            name = "email"
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={email}
            onChange={update}
            />
        </div>
    </div>
  )
}

export default EmailBar