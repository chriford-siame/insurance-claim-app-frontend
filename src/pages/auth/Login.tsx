import React, { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { handleLogin } = useAuth();


    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin(username, password);
            // Redirect after login
            window.location.href = "/";
        } catch (err) {
            setError("Invalid credentials");
        }
    }

    return (
        <div className="flex justify-center">
            <div className=" md:w-[45%] border p-2 lg:md:w-[45%] xl:md:w-[45%] text-2xl">
                <div className="flex justify-center my-2 w-full">
                    <p className="text-gray-500 font-bold">Login</p>
                </div>
                {/* <hr /> */}
                <form onSubmit={handleSubmit} className='grid container gap-2 text-[12pt]'>
                    <label htmlFor="username">Username</label>
                    <input
                        name='username'
                        id='username'
                        placeholder=''
                        type="text"
                        className='border border-gray-300 p-2'
                        onChange={handleUsernameChange}
                        required={true}
                        maxLength={5} />

                    <label htmlFor="password">Password</label>
                    <input
                        name='password'
                        id='password'
                        placeholder=''
                        type="password"
                        className='border border-gray-300 p-2'
                        onChange={handlePasswordChange}
                        required={true}
                    />
                    <div className="grid gap-1">
                        <div className='flex justify-between'>
                            <a href='#' className=' text-blue-400 hover:text-blue-500'>Forgot password</a>
                            <p>Don't have an account? <a href='/register' className=' text-blue-400 hover:text-blue-500'>Signup</a></p>
                        </div>
                    </div>
                    <button type="submit" className='text-white bg-blue-600 p-2 w-full'>submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login