import React from 'react'
import EmailBar from '../components/EmailBar'

const ForgotPasswordPage = () => {
return (
    <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-1 text-center'>Reset Password</h2>
        <p className='text-sm text-center text-gray-600 mb-4'>
            Enter your email and we'll send you a link to reset your password
        </p>
        <form className='space-y-6'>
            {/* Email */}
            <EmailBar placeholder="me@example.com"/>
            
            <button 
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded w-full mb-4'
            >
            Send Email
            </button>
            <p className="text-sm text-center">
                <a href='/login' className='text-blue-500 hover:underline font-medium'>
                Go Back
                </a>
            </p>
        </form>
        </div>
    </div>
    )
}

export default ForgotPasswordPage