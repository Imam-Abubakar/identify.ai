import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { FaRotate } from "react-icons/fa6";
import Accept from "../assets/Accept.svg";
import Cancel from "../assets/Cancel.svg";
import Shooter from "../assets/Shooter.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Scanner = () => {
    const [files, setFiles] = useState(null);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const API_BASE_URL =
        "https://5000-imamabubakar-identifyai-m8w3es7skny.ws-eu103.gitpod.io";
    const videoConstraints = {
        facingMode: "environment",
    };

    const userID = JSON.parse(window.localStorage.getItem("user"));

    const toastError = (message) => toast.error(message);
    const toastSuccess = (message) => toast.success(message);

    let imageSrc = "";
    const webcamRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFiles(selectedFile);
    };

    const capture = React.useCallback(() => {
        imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc);
    }, [webcamRef]);

    const saveImage = useCallback( async(acceptedFile) => {
        const url = "https://api.cloudinary.com/v1_1/almpo/image/upload";

            const formData = new FormData();
            formData.append("file", acceptedFile);
            formData.append(
                "upload_preset",
                "invoice"
            );

            const response = await fetch(url, {
                method: "post",
                body: formData,
            });
            const data = await response.json();
            return data.secure_url;
    }, []);


    const findCriminal = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        let imageUrl = "";

        if (files) {
            formData?.append('File1', files);
        } else if (image) {
            formData?.append('File1', image);
        } else {
            console.log("No image found");
            return
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/criminal/find`,
                formData
            );

            console.log(response.data);
            if(files) {
                imageUrl = await saveImage(files)
            } else if (image) {
                imageUrl = await saveImage(image)
            }

            if(response.data?.result[0] == null | undefined) {
                setLoading(false)
                toastError("Face not found");
                const formData =  {
                    image: imageUrl,
                    result: "false",
                    details: "None"
                }
                console.log(formData)
                saveHistory(formData)
            }


        } catch (error) {
            console.error("Error adding criminal:", error);
            console.log("An error occurred while adding the criminal.");
            setLoading(false)
                toastError("Error Occured");
        }
    };

    const saveHistory = async (formData) => {
        const response = await axios.post(
            `${API_BASE_URL}/user/scan/add/${userID?._id}`,
            formData
        );

        console.log(response);
    }

    return (
        <div className="flex w-full justify-center items-start h-screen bg-gray-100/70 text-white">
            <ToastContainer />
            <div className="m-4 h-max ">
                {loading ?
                <p className="text-black text-2xl font-al-800 animate-pulse text-center mt-[13rem]">Searching...</p>
            :
            <>
                <p className="text-black text-lg font-al-800">Take a picture:</p>
                <div className="h-max mt-4 border-[3px] border-black">
                    {image === "" ? (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={1}
                            videoConstraints={videoConstraints}
                        />
                    ) : (
                        <img className="" src={image} alt="profileImage" />
                    )}
                </div>
                <p className="text-black text-2xl my-4 font-al-800 text-center mx-auto ">
                    OR
                </p>
                <p className="text-black text-lg font-al-800">Import image file:</p>
                <input
                    type="file"
                    accept="image/jpeg"
                    onChange={(e) => handleFileChange(e)}
                    className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-1"
                />

                <div>
                    {(files !== null) | (image !== "") && (
                        <div
                            onClick={findCriminal}
                            className="px-5 py-3 mx-auto w-max mt-4 bg-black font-al-900  text-white hover:text-white font-medium cursor-pointer hover:bg-idy "
                        >
                            Search Face
                        </div>
                    )}
                </div>
            </>
            
            }

                <nav className="fixed bottom-0 left-0 w-full bg-black border-t-[2px] border-t-black text-gray-500 py-4">
                    <ul className="flex justify-around items-center">
                        <li>
                            <a
                                className="flex flex-col justify-center items-center gap-[2px] text-black"
                                href="/home"
                            >
                                <img src={Cancel} alt="home" />
                            </a>
                        </li>
                        <li className="flex flex-col justify-center items-center gap-[2px]">
                            {image === "" ? (
                                <img
                                    src={Shooter}
                                    alt="snap"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        capture();
                                    }}
                                />
                            ) : (
                                <span className="p-4 bg-white text-black rounded-full">
                                    <FaRotate
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setImage("");
                                        }}
                                    />
                                </span>
                            )}
                        </li>

                        <li className="flex flex-col justify-center items-center gap-[2px]  ">
                            <a href="/scan/kinni">
                                <img src={Accept} alt="Accept" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Scanner;
