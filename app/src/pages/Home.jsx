import React, { useState, useEffect } from 'react';
import user from "../assets/user.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaFileLines, FaHouseChimney } from "react-icons/fa6";
import DateAgeFormatter from '../components/DateAgeFormatter';

const Home = () => {
    const userID = JSON.parse(window.localStorage.getItem("user"));
    const auth = JSON.parse(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    const API_BASE_URL = "https://5000-imamabubakar-identifyai-m8w3es7skny.ws-eu103.gitpod.io";
    const [userData, setUserData] = useState([]);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        if (userID == null | undefined) {
            navigate("/login")
        }
    }, [])

    let formData = {
        auth: auth,
    };

    const getUserProfile = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/user/${userID?._id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            localStorage.setItem("profile", JSON.stringify(data));
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadHistory = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/user/scan/history/${userID?._id}`);
            console.log(response.data?.scanHistory);
            setHistoryData(response.data?.scanHistory)
        } catch (error) {
            console.error("Error adding criminal:", error);
        }
    };

    useEffect(() => {
        getUserProfile();
        loadHistory();
    }, []);

    return (
        <div className="flex justify-center h-screen bg-white text-white">
            <div className="w-full">
                <div className='flex  flex-col  gap-1'>
                    <div className='sticky top-0 bg-white border-b-[2px] border-black'>
                        <div className='w-full  flex flex-col px-6 h-max bg-black'>
                            <h1 className='text-2xl mt-4 text-left font-al-900'>
                                Welcome back,<br /> {userID?.name}
                            </h1>
                            <div className="bg-[#f0f0b6] shadow-md flex flex-col justify-center items-center px-2 py-6  text-black mt-2 mb-4">
                                <p className="text-sm mt-2 font-al-400 mb-[-10px]">TOTAL FACE SCANS</p>
                                <h1 className="text-5xl my-2 font-al-900">{historyData?.length}</h1>
                            </div>

                        </div>
                        <a href="/scan" className="bg-idy-light mx-auto w-[90vw] cursor-pointer border-[2px] border-black rounded-t-2xl rounded-r-2xl flex flex-row justify-center gap-4 items-center px-4 py-2  text-black mt-2 mb-2">
                            <FaCamera className='text-3xl' />
                            <h1 className="text-sm font-al-800">Prevent misidentification today and avoid wahala. Start scanning!</h1>
                        </a>
                    </div>
                    <div className='px-4 flex flex-col justify-start items-start text-start gap-1 mb-20'>
                        <h1 className='text-xl text-black mt-2  font-al-900'>
                            Recent Scans
                        </h1>
                        {historyData === [] ?
                            <p className="text-black text-xl mx-auto font-al-800 text-center mt-[2rem]">
                                No History Yet
                            </p>
                            :
                            <>
                                {historyData?.map((criminal) => (
                                    <div className='flex flex-row border-[2px] w-full border-black'>
                                        <img src={criminal?.image} alt="user" className='w-[4rem] h-[4rem] flex-1/4 ' />
                                        <div className='flex-2/3 flex flex-col items-start justify-center ml-4'>
                                            {criminal?.result == "false" ?

                                                <p className="text-red-600 text-[12px] mb-[-10px] font-medium">
                                                    Not Found
                                                </p> :

                                                <p className="text-green-600 text-[12px] mb-[-10px] font-medium">
                                                    Found
                                                </p>}
                                            <p className='text-gray-700 text-lg font-al-800'> <DateAgeFormatter inputDate={criminal?.date} /></p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                        </div>

                        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t-[2px] border-t-black text-black p-2">
                            <ul className="flex justify-around">
                                <li><a className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 text-idy" href="/home" ><FaHouseChimney className='text-md' />Home</a></li>
                                <li><a className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 " href="/scan" ><FaCamera className='text-md' />Scan</a></li>
                                <li><a className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 " href="/history" ><FaFileLines className='text-md' />History</a></li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
            );
};

            export default Home;
