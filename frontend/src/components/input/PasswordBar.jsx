import React from 'react'

const PasswordBar = ({label, svg, placeholder}) => {
  return (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <div className="relative">
            {svg && (<svg 
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
            </svg>)}
            <input
            type="password"
            required
            placeholder={placeholder}
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="password"
            />
        </div>
    </div>
  )
}

export default PasswordBar