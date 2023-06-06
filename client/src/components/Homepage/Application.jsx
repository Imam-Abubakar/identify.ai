import React from "react";

const Application = () => {
  return (
    <div className="border-t-[1px] bg-[#2665ad] text-[#fefff4] border-b-[1px] border-[#161616]">
      <div className="mt-10 mb-14 w-[95vw] mx-auto ">
        <h1 className="font-bold text-3xl tablet:text-5xl mt-6 mb-10">Applications</h1>

        <div className="flex flex-col tablet:flex-row tablet:justify-between gap-5">
          <div className="tablet:w-[50vw] border-[#161616] border-[3px] bg-[#fefff4] text-[#161616] p-10 rounded-xl">
            <h1 className="font-bold text-xl tablet:text-2xl mb-4">
            Advanced Facial Recognition for Accurate Criminal Identification
            </h1>
            <p>
            Our platform utilizes state-of-the-art facial recognition algorithms to accurately identify individuals in real-time. Capable of recognizing multiple faces in a single image, our system can perform face matches against databases containing millions of faces. This powerful technology enables law enforcement agencies to quickly and efficiently identify criminals, even in crowded environments.
            </p>
          </div>
          <div className="tablet:w-[50vw] mx-auto ">
            <p className="font-light text-lg tablet:text-xl my-4"> Our Criminal Identification Platform is designed to support a wide range of applications, including:</p>
            <ul className="font-light text-lg tablet:text-xl my-4 mb-[3rem]">
              <li className="my-4">✂️ Surveillance and monitoring</li>
              <li className="my-4">✂️ Access control and identity verification</li>
              <li className="my-4">✂️ Criminal investigations and forensics</li>
              <li className="my-4">✂️ Missing persons and child recovery</li>
              <li className="my-4">✂️ Border control and immigration enforcement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;


/*
Our Criminal Identification Platform is designed to support a wide range of applications, including:
Surveillance and monitoring
Access control and identity verification
Criminal investigations and forensics
Missing persons and child recovery
Border control and immigration enforcement

*/