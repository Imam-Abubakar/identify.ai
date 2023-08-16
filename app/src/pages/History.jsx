import React, { useState, useEffect } from "react";
import user from "../assets/user.webp";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaFileLines, FaHouseChimney } from "react-icons/fa6";
import axios from "axios";
import DateAgeFormatter from "../components/DateAgeFormatter";

const History = () => {
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);
    const [singleHistory, setSingleHistory] = useState(null)
    const [displaySingle, setDisplaySingle] = useState(false)

    const API_BASE_URL =
        "https://identify-api-jf4t.onrender.com";

    const userID = JSON.parse(window.localStorage.getItem("user"));

    const navigate = useNavigate();

    const saveScan = (criminal) => {
        setSingleHistory(criminal)
        setDisplaySingle(true)
    };

    const clearSingle = () => {
        setSingleHistory(null)
        setDisplaySingle(false)
    }

    console.log(singleHistory)

    const loadHistory = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_BASE_URL}/user/scan/history/${userID?._id}`);
            console.log(response.data?.scanHistory);
            setHistoryData(response.data?.scanHistory)
            setLoading(false)
        } catch (error) {
            console.error("Error adding criminal:", error);
        }
    };

    console.log(historyData)

    useEffect(() => {
        loadHistory()
    }, [])

    return (
        <>
            {(singleHistory === null | undefined) && (displaySingle === false) ?
                <div className="flex justify-center h-screen bg-white text-white">
                    <div className="w-full">
                        <div className="flex  flex-col  gap-1">
                            <div className=" flex flex-col justify-start items-start text-start gap-1">
                                <h1 className="sticky w-full pl-4 top-0 text-3xl bg-white py-3 text-black mt-4 mb-1 font-al-900">
                                    Scan History
                                    <p className="text-gray-500 text-base">
                                        Here's an history of your face scans
                                    </p>
                                </h1>
                                {loading ? (
                                    <p className="text-black text-2xl mx-auto font-al-800 animate-pulse text-center mt-[13rem]">
                                        Searching...
                                    </p>
                                ) : (
                                    <div className="w-full px-4 flex flex-col gap-2 mb-20">
                                        {historyData === [] ?
                                            <p className="text-black text-2xl mx-auto font-al-800 text-center mt-[13rem]">
                                                No History Yet
                                            </p>
                                            :
                                            <>
                                                {historyData?.map((criminal) => (
                                                    <div
                                                        onClick={() => saveScan(criminal)}
                                                        className="flex flex-row border-[2px] w-full border-black"
                                                        key={criminal?.date}
                                                    >
                                                        <img
                                                            src={criminal?.image}
                                                            alt="user"
                                                            className="w-[6rem] h-[6rem] flex-1/4  "
                                                        />
                                                        <div className="flex-2/3 flex flex-col items-start justify-center ml-4">
                                                            {criminal?.result == "false" ?

                                                                <p className="text-red-600 text-[12px] mb-[-10px] font-medium">
                                                                    Not Found
                                                                </p> :

                                                                <p className="text-green-600 text-[12px] mb-[-10px] font-medium">
                                                                    Found
                                                                </p>}
                                                            <p className="text-gray-700 text-lg font-al-800">
                                                                <DateAgeFormatter inputDate={criminal?.date} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        }
                                    </div>
                                )}
                            </div>
                            <nav className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t-[2px] border-t-black text-black p-2">
                                <ul className="flex justify-around">
                                    <li>
                                        <a
                                            className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 "
                                            href="/home"
                                        >
                                            <FaHouseChimney className="text-md" />
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 "
                                            href="/scan"
                                        >
                                            <FaCamera className="text-md" />
                                            Scan
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="flex flex-col justify-center items-center gap-[2px] px-4 py-1 text-idy"
                                            href="/history"
                                        >
                                            <FaFileLines className="text-md" />
                                            History
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                :
                <div className="flex justify-center mx-4 h-screen bg-white text-white">
                    <div className="w-full">
                        <div className='flex  flex-col  gap-1'>
                            <div className=' flex flex-col justify-start items-start text-start gap-1'>
                                <h1 className='flex gap-2 items-center justify-start w-full top-0 text-xl py-3 text-idy text-medium mt-4 mb-1 font-al-900'>
                                    <FaArrowLeft onClick={clearSingle} /> Scan Details
                                </h1>
                                <div className='flex flex-col border-[2px] w-full h-screen border-black text-black  rounded-t-xl'>
                                    <img src={singleHistory?.image} alt="user" className='w-full h-[45%] flex-1/4 border-b-[2px] border-black rounded-t-lg ' />
                                    <div className='flex-2/3 flex flex-col mx-2 mt-4 items-start justify-center ml-4'>
                                        <label className='text-sm font-al-800'>Event</label>
                                        <p className='outline-none text-md  w-full  mb-4'>Face Scan</p>
                                        <label className='text-sm font-al-800'>Event Period</label>
                                        <p className='outline-none text-md  w-full mb-4'><DateAgeFormatter inputDate={singleHistory?.date} /></p>
                                        <label className='text-sm font-al-800'>Status</label>
                                        {
                                            singleHistory?.result == "false"?
                                            <p className='outline-none text-red-600 text-md  w-full mb-4'>Not Found</p>
                                            :
                                            <p className='outline-none text-green-600 text-md  w-full mb-4'>Found</p>
                                        }
                                        
                                        <label className='text-sm font-al-800'>Details</label>
                                        <p className='outline-none text-md  w-full mb-4'>{singleHistory?.details}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default History;
