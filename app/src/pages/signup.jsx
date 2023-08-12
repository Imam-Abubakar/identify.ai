import React, { useState } from 'react';
import Step1Imd from "../assets/logo-name.png";

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('YOUR_API_ENDPOINT/login', {
                fullname,
                email,
                password,
            });
            // Assuming your API returns a token upon successful login
            const token = response.data.token;
            // Save the token to local storage or session storage for authentication
            localStorage.setItem('token', token);
            onLoginSuccess();
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    return (
        <div className="flex justify-center p-4 h-screen bg-white text-white">
            <div className="w-full">
                <div className='flex justify-center flex-col text-center items-center gap-1'>
                    <img src={Step1Imd} alt='Image 1' className='w-[5rem] mt-[2rem] ' />
                    <form onSubmit={handleLogin} className='mt-6 text-gray-400 flex flex-col justify-start items-start'>
                        
                         <label className='text-sm mb-2 font-al-900'>Full Name</label>
                        <input
                             type="text"
                             placeholder="Enter Your Full Name"
                             value={fullname}
                             onChange={(e) => setFullname(e.target.value)}
                             required
                            className='border-[2px] outline-none text-md font-al-900 border-black py-2 pl-2 w-full mb-6'
                        />
                        <label className='text-sm mb-2 font-al-900'>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='border-[2px] outline-none text-md font-al-900 border-black py-2 pl-2 w-full mb-6'
                        />
                        <label className='text-sm mb-2 font-al-900'>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='border-[2px] outline-none text-md font-al-900 border-black py-2 pl-2 w-full mb-6'
                        />
                        <button
                            className="w-[90vw] bg-black border-[2px] hover:border-black hover:text-black hover:bg-white font-semibold border-white text-white px-4 mb-16 py-2"
                        >
                            Create Account
                        </button>
                    </form>
                    <span className="text-sm font-base text-black mb-12">Already a user?  <a href="/register" className="text-idy text-semibold">Login</a></span>
                </div>
            </div>
        </div>
    )
}

export default Signup