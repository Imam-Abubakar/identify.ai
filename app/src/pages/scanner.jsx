import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { FaRotate } from "react-icons/fa6";
import Accept from "../assets/Accept.svg";
import Cancel from "../assets/Cancel.svg";
import Shooter from "../assets/Shooter.svg";

const Scanner = () => {
    const videoConstraints = {
        facingMode: "environment",
    };

    let imageSrc = "";

    const [image, setImage] = useState("");
    const webcamRef = useRef(null);

    const capture = React.useCallback(() => {
        imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc)
    }, [webcamRef]);
    return (
        <div className="flexw-full justify-center items-start h-screen bg-gray-100/70 text-white">
            <div className='m-4 h-max '>
                <div className="h-max mt-4 border-[3px] border-black">
                    {image === "" ? (
                        <Webcam audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={1}
                            videoConstraints={videoConstraints} />
                    ) : (
                        <img className="" src={image} alt="profileImage" />
                    )}
                </div>
                <div>
                    {image !== "" &&
                        <div className="px-5 py-3 mx-auto w-max mt-4 bg-black font-al-900  text-white hover:text-white font-medium cursor-pointer hover:bg-idy ">
                            Search Face
                        </div>
                    }

                </div>


                <nav className="fixed bottom-0 left-0 w-full bg-black border-t-[2px] border-t-black text-gray-500 py-4">
                    <ul className="flex justify-around items-center">
                        <li><a className="flex flex-col justify-center items-center gap-[2px] text-black" href="/home" ><img src={Cancel} alt="home" /></a></li>
                        <li className="flex flex-col justify-center items-center gap-[2px]">
                            {image === "" ? (
                                <img src={Shooter} alt="snap" onClick={(e) => {
                                    e.preventDefault();
                                    capture();
                                }} />
                            ) : (
                                <span className="p-4 bg-white text-black rounded-full" >
                                    <FaRotate onClick={(e) => {
                                        e.preventDefault();
                                        setImage("");
                                    }} />

                                </span>

                            )}
                        </li>

                        <li className="flex flex-col justify-center items-center gap-[2px]  "><a href="/scan/kinni"><img src={Accept} alt="Accept" /></a></li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default Scanner