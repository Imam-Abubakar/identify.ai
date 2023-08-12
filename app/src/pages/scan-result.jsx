import React from 'react'
import user from "../assets/user.webp";
import { useNavigate } from "react-router-dom"

import { FaArrowLeft } from "react-icons/fa6";

const ScanResult = () => {
    const navigate = useNavigate()

    const goToScan = () => {
        navigate("/scan");
    }

    return (
        <div className="flex justify-center mx-4 h-screen bg-white text-white">
        <div className="w-full">
            <div className='flex  flex-col  gap-1'>
                <div className=' flex flex-col justify-start items-start text-start gap-1'>
                    <h1 className='flex gap-2 items-center justify-start w-full top-0 text-xl py-3 text-idy text-medium mt-4 mb-1 font-al-900'>
                        <FaArrowLeft onClick={goToScan} /> Scan Result
                    </h1>
                    <div className='flex flex-col border-[2px] w-full h-screen border-black text-black  rounded-t-xl'>
                        <img src={user} alt="user" className='w-full h-[45%] flex-1/4 border-b-[2px] border-black rounded-t-lg ' />
                        <div className='flex-2/3 flex flex-col mx-2 mt-4 items-start justify-center ml-4'>
                            <label className='text-sm font-al-800'>Event</label>
                            <p className='outline-none text-md  w-full  mb-4'>Face Scan</p>
                            <label className='text-sm font-al-800'>Event Period</label>
                            <p className='outline-none text-md  w-full mb-4'>Tuesday, 20th August 2023</p>
                            <label className='text-sm font-al-800'>Status</label>
                            <p className='outline-none text-green-600 text-md  w-full mb-4'>Found</p>
                            <label className='text-sm font-al-800'>Details</label>
                            <p className='outline-none text-md  w-full mb-4'>Emmanuel Ajagbe Rasheed</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default ScanResult