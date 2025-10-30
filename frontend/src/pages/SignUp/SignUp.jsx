import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validateName, validatePassword } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!validateName(name)) {
            setError("Name is required.");
            return;
        }

        if(!validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }
        
        if(!validatePassword(password)) {
            setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }

        setError(null);

        // SignUp API Call
        try {
            const response = await axiosInstance.post('/create-account', {
                fullName: name,
                email: email,
                password: password,
            });

            // Handle Successful Registration Response 
            if(response.data && response.data.error) {
                setError(response.data.message);
                return; 
            }

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
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-10'>
                <div className='w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md border rounded-2xl bg-white px-6 sm:px-8 py-8 shadow-lg'>
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl font-semibold mb-6 text-center">SignUp</h4>

                        <input type="text" 
                        placeholder='Name' 
                        className='input-box w-full mb-4'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                        <input type="text" 
                        placeholder='Email' 
                        className='input-box w-full mb-4'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                        <PasswordInput 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} /> 

                        { error && <p className='text-red-500 text-sm mb-2'>{error}</p> }

                        <button type="submit" className='btn-primary w-full mt-5'>Create Account</button>

                        <p className="text-sm text-center mt-4">
                            Already have an account? {" "}
                            <Link to="/login" className="font-medium text-primary underline">
                                Login 
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
