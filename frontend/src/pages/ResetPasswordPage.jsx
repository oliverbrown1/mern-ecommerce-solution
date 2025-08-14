import React, { useState } from 'react'
import PasswordBar from '../components/input/PasswordBar'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [newPwd, setNewPwd] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const { id, token } = useParams();

    const resetPassword = async (e) => {
        e.preventDefault();
        if(confirmPwd !== newPwd){
            return alert("Passwords do not match");
        }
        try{
            const response = await axios.post("http://localhost:3001/auth/reset-password", {
                id: id,
                token: token,
                pwd: confirmPwd
            });
            console.log(response.data);
            // store token
            // response.data.token
            navigate("/login");
        }
        catch(error){
            console.log(error);
            alert(error.response.data.message)
        }
    }
        
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Change Password</h2>
        <form className='space-y-6' onSubmit={resetPassword}>
            {/* Password */}
            <div>
                <PasswordBar label="New Password" svg={true} placeholder="Create a new password" value = {newPwd} update={(e) => setNewPwd(e.target.value)}/>
                <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with a number and both lowercase and uppercase letters
                </p>
            </div>

            <PasswordBar label="Confirm New Password" svg={true} placeholder="Re-enter password"  value = {confirmPwd}update={(e) => setConfirmPwd(e.target.value)}/>
           
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