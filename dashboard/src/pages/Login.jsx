import React, { useState } from 'react';
import logo from "../images/logo-name.png"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    let formData = {
        email: email, password: password
    };

    const sendData = async (e) => {
        e.preventDefault();

        const response = await fetch("https://5000-imamabubakar-identifyai-m8w3es7skny.ws-eu103.gitpod.io/login/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const newUserData = await response.json();
        if (response.status === 400 || !newUserData) {
        } else {
            console.log("Logged in successfully")
            window.localStorage.setItem("userID", true);
            navigate("/home");
        }
    };
    return (
        <div className="flex  h-screen p-4 ">
            <div className='mx-auto w-full md:w-[40vw] text-center mb-15 items-center gap-1'>
                <img src={logo} alt='Image 1' className='w-[6rem] mx-auto my-[2rem] ' />
                <h1 className='text-4xl font-al-900'>Admin Login</h1>
                <form className='mt-6  flex flex-col justify-start items-start'>
                    <label className='text-sm mb-2 font-al-900'>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-6'
                    />
                    <label className='text-sm mb-2 font-al-900'>Password</label>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-6'
                    />
                    <button
                        onClick={sendData}
                        className="w-[60%] mx-auto bg-black border-[2px] hover:border-black hover:text-black hover:bg-white font-semibold border-white text-white px-4 mt-2 mb-16 py-2"
                    >
                        Login
                    </button>
                </form>

                <a className="text-sm font-base  mb-4">Forgot Password</a>
                <p className="text-sm font-base  mb-12">Not a user?  <a href="/register" className="text-idy text-semibold">Create Account</a></p>
            </div>
        </div>
    )
}

export default Login