import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail, validatePassword } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }

        if(!validatePassword(password)) {
            setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }

        // Clear error if validation passes for both fields 
        setError(null);

        // Login API Call
        try {
            const response = await axiosInstance.post('/login', {
                email: email,
                password: password,
            });

            // Handle Successful Login Response 
            if(response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard');
            }
        } catch (error) {
            // Handle Login Error
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20'>
                <div className='w-full max-w-sm sm:max-w-md md:max-w-lg border border-gray-200 rounded-xl bg-white shadow-sm px-6 sm:px-8 py-8 sm:py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h4>
                        
                        <input type="text" 
                        placeholder='Email' 
                        className='input-box mb-4 w-full'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                        <PasswordInput 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                        
                        { error && <p className='text-red-500 text-sm mb-3 mt-1 text-center'>{error}</p> }

                        <button type="submit" className='btn-primary w-full py-2 sm:py-3 mt-2 font-medium shadow-md hover:shadow-lg transition-all'>Login</button>

                        <p className="text-sm text-center mt-5 text-gray-600">
                            Not registered yet? {" "}
                            <Link to="/signup" className="font-medium text-primary underline hover:text-blue-600 transition">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
