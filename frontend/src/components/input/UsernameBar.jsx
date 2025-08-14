import React from 'react'

const UsernameBar = ({prompt, update, user}) => {
  return (
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
            placeholder={prompt}
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={user}
            onChange={update}
            />
        </div>
    </div>
  )
}

export default UsernameBar