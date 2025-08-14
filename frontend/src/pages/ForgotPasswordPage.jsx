import React, { useState } from 'react'
import EmailBar from '../components/input/EmailBar'
import UsernameBar from '../components/input/UsernameBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [useUsername, setUseUsername] = useState(false);
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [disableButton, setDisableButton] = useState(false);
    
    const forgotPassword = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        setIsLoading(true);
        try{
            const response = await axios.post("http://localhost:3001/auth/forgot", {
                email: email,
                user: user,
                useUser: useUsername
            });
            console.log(response.data);
            // store token
            // response.data.token
        }
        catch(error){
            alert(error)
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='border p-8 rounded-lg shadow-md w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-1 text-center'>Reset Password</h2>
            <p className='text-sm text-center text-gray-600 mb-4'>
                Enter your email or username and we'll send you a link to reset your password
            </p>
            <form className='space-y-6' onSubmit={forgotPassword}>
                {/* Email */}
                {!useUsername && <EmailBar placeholder="me@example.com" update={(e) => setEmail(e.target.value)} email={email}/>}


                {/* Username */}
                {useUsername && <UsernameBar placeholder="me@example.com" update={(e) => setUser(e.target.value)} user={user}/>}
                
                <button 
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded w-full mb-4'
                disabled={disableButton}
                >
                {disableButton ? "Sent" : (useUsername ? "Send Username" : "Send Email")}
                </button>
                <p className="text-sm text-center flex flex-row gap-6 justify-center">
                    <a href='/login' className='text-blue-500 hover:underline font-medium'>
                        Go Back
                    </a>
                    <button 
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setUseUsername(!useUsername);
                        }} 
                        className="text-blue-500 hover:underline font-medium bg-transparent border-none p-0 cursor-pointer"
                    >
                        {useUsername ? "Use your email instead?" : "Use your username instead?"}
                    </button>
                </p>
            </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage