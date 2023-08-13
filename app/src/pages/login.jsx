import React, { useState, useContext } from 'react';
import Step1Imd from "../assets/logo-name.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUserID } = useContext(UserContext);

    const navigate = useNavigate();

    const registerError = (message) => toast.error(message);
    const registerSuccess = (message) => toast.success(message);

    let formData = {
        email: email, password: password
    };

    const sendData = async (e) => {
        e.preventDefault();

        const response = await fetch("https://5000-imamabubakar-identifyai-m8w3es7skny.ws-eu103.gitpod.io/login/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const newUserData = await response.json();
        if (response.status === 400 || !newUserData) {
            registerError(newUserData.message);
        } else {
            console.log("Logged in successfully")
            registerSuccess("Successful Login");
            window.localStorage.setItem("userID", true);
            setUserID(true);
            navigate("/home");
        }
    };

    return (
        <div className="flex justify-center p-4 h-screen bg-white text-white">
            <div className="w-full">
            <ToastContainer />
                <div className=' flex justify-center flex-col text-center items-center gap-1'>
                    <img src={Step1Imd} alt='Image 1' className='w-[5rem] mt-[2rem] ' />
                    <form className='mt-6 text-black/80 flex flex-col justify-start items-start'>
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
                            onClick={sendData}
                            className="w-[90vw] bg-black border-[2px] hover:border-black hover:text-black hover:bg-white font-semibold border-white text-white px-4 mb-16 py-2"
                        >
                            Login
                        </button>
                    </form>

                    <a className="text-sm font-base text-black mb-4">Forgot Password</a>
                    <span className="text-sm font-base text-black mb-12">Not a user?  <a href="/register" className="text-idy text-semibold">Create Account</a></span>
                </div>
            </div>
        </div>
    )
}

export default Login