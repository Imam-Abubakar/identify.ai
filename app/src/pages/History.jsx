import React, { useState } from 'react';
import user from "../assets/user.webp";
import { useNavigate } from "react-router-dom"
import { FaCamera, FaFileLines, FaHouseChimney } from "react-icons/fa6";

const History = () => {
    const navigate = useNavigate()

    const goToScan = () => {
        navigate("/history/kinni");
    }
    return (
        <div className="flex justify-center h-screen bg-white text-white">
            <div className="w-full">
                <div className='flex  flex-col  gap-1'>
                    <div className=' flex flex-col justify-start items-start text-start gap-1'>
                        <h1 className='sticky w-full pl-4 top-0 text-3xl bg-white py-3 text-black mt-4 mb-1 font-al-900'>
                            Scan History
                            <p className='text-gray-500 text-base'>Here's an history of your face scans</p>
                        </h1>
                        <div className='w-full px-4 flex flex-col gap-2 mb-20'>
                            <div onClick={goToScan} className='flex flex-row border-[2px] w-full border-black'>
                                <img src={user} alt="user" className='w-[6rem] h-[6rem] flex-1/4  ' />
                                <div className='flex-2/3 flex flex-col items-start justify-center ml-4'>
                                    <p className='text-green-600 text-[12px] mb-[-10px] font-medium'>Found</p>
                                    <p className='text-gray-700 text-lg font-al-800'>23/08/2023</p>
                                </div>
                            </div>
                           
                        </div>
                        
                    </div>
                    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t-[2px] border-t-black text-black p-2">
                        <ul className="flex justify-around">
                            <li><a className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 " href="/home" ><FaHouseChimney className='text-md' />Home</a></li>
                            <li><a className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 " href="/scan" ><FaCamera className='text-md' />Scan</a></li>
                            <li><a className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 text-idy" href="/history" ><FaFileLines className='text-md' />History</a></li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    );
};

export default History;
