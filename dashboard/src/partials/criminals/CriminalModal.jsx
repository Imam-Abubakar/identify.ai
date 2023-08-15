import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const CriminalModal = () => {
    // State variable to control the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [criminalRecord, setCriminalRecord] = useState('');
    const [mugshot, setMugshot] = useState('');
    const [files, setFiles] = useState([null, null, null]);
    const [message, setMessage] = useState('');
    const [progress, setProgress] = useState(0)


    const onDrop = useCallback((acceptedFiles) => {
        const url = "https://api.cloudinary.com/v1_1/almpo/image/upload";

        acceptedFiles.forEach(async (acceptedFile) => {

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
            setProgress(100)
            const data = await response.json();

            setMugshot(data.secure_url)
            console.log(data)
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accepts: "image/*",
        multiple: false,
    });

    const handleFileChange = (index, e) => {
        const selectedFile = e.target.files[0];
        const updatedFiles = [...files];
        updatedFiles[index] = selectedFile;
        setFiles(updatedFiles);
    };

    const addCriminal = async (e) => {
        e.preventDefault();

        console.log(files)

        if (
            !firstName ||
            !lastName ||
            !dateOfBirth ||
            !nationality ||
            !gender ||
            !criminalRecord ||
            !mugshot ||
            files.some((file) => file === null)
        ) {
            setMessage('Please fill all the details properly.');
            return;
        }

        let formData = new FormData();
        formData?.append('firstName', firstName);
        formData?.append('lastName', lastName);
        formData?.append('dateOfBirth', dateOfBirth);
        formData?.append('nationality', nationality);
        formData?.append('gender', gender);
        formData?.append('criminalRecord', criminalRecord);
        formData?.append('mugshot', mugshot);
        files.forEach((file, index) => {
            formData?.append(`File${index + 1}`, file);
        });


        try {
            const response = await axios.post('https://identify-api-jf4t.onrender.com/criminal/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setMessage('Criminal added successfully');
            }
        } catch (error) {
            console.error('Error adding criminal:', error);
            setMessage('An error occurred while adding the criminal.');
        }

    };

    console.log(mugshot)

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='flex flex-col col-span-full'>
            {/* Button to open the modal */}
            <button
                className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 font-bold py-3 px-4 text-slate-800 dark:text-slate-100 focus:outline-none focus:shadow-outline"
                onClick={openModal}
            >
                Add new Criminal
            </button>

            {/* The modal */}
            {isModalOpen && (
                <div className="fixed z-40 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>

                        {/* Centered content */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        ></span>
                        <div
                            className="inline-block align-bottom bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            {/* Modal actions */}
                            <div className=" sticky top-0 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center  border-transparent px-4 py-2 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-700 dark:border-slate-200  text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                            {/* Modal content */}
                            <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex  p-4 ">
                                    <div className='mx-auto w-full md:w-[40vw] text-center items-center mb-15 gap-1'>
                                        <h1 className='text-4xl font-al-900'>Add New Criminal</h1>
                                        <form className='mt-6  flex flex-col justify-start items-start'>
                                            <label className="text-sm mb-2 font-al-900">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter First Name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                                className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-6"
                                            />

                                            <label className="text-sm mb-2 font-al-900">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Last Name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                                className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-6"
                                            />

                                            <label className="text-sm mb-2 font-al-900">Date of Birth</label>
                                            <input
                                                type="date"
                                                placeholder="Enter Date of Birth"
                                                value={dateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                                required
                                                className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-6"
                                            />

                                            <label className="text-sm mb-2 font-al-900">Nationality</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Nationality"
                                                value={nationality}
                                                onChange={(e) => setNationality(e.target.value)}
                                                required
                                                className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-6"
                                            />

                                            <label className="text-sm mb-2 font-al-900">Gender</label>
                                            <select
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                required
                                                className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-6"
                                            >
                                                <option value="" disabled>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>

                                            <label className="text-sm mb-2 font-al-900">Crime(s)</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Crime(s)"
                                                value={criminalRecord}
                                                onChange={(e) => setCriminalRecord(e.target.value)}
                                                required
                                                className="border-[2px] outline-none text-md font-al-900 border-black py-8 pl-4 w-full mb-6"
                                            />

                                            <label className="text-sm mb-2 font-al-900">Mugshot</label>
                                            {mugshot === "" ?
                                                <div
                                                    {...getRootProps()}
                                                    className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-1"
                                                >
                                                    <input {...getInputProps()} />
                                                    Upload Image
                                                </div>
                                                :
                                                <img src={mugshot} alt="Image" className="border-[2px] outline-none text-md font-al-900 border-black w-[100px] mb-1" />
                                            }

                                            <label className="text-sm mb-2 font-al-900">Images(3)</label>

                                            <input type="file" accept="image/jpeg" onChange={(e) => handleFileChange(0, e)} className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-1" />
                                            <input type="file" accept="image/jpeg" onChange={(e) => handleFileChange(1, e)} className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-1" />
                                            <input type="file" accept="image/jpeg" onChange={(e) => handleFileChange(2, e)} className="border-[2px] outline-none text-md font-al-900 border-black py-3 pl-4 w-full mb-6" />

                                            <button
                                                onClick={addCriminal}
                                                className="w-[60%] mx-auto bg-black border-[2px] hover:border-black hover:text-black hover:bg-white font-semibold border-white text-white px-4 mt-2 mb-16 py-2"
                                            >
                                                Add Criminal
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CriminalModal