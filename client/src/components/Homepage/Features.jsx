import React from "react";

const Features = () => {
  return (
    <div className="border-t-[1px] bg-[#6b9acf] text-[#fefff4] border-b-[1px] border-[#161616]">
      <div className="my-10 w-[95vw] mx-auto ">
        <h1 className="font-bold text-3xl tablet:text-5xl my-6">Features</h1>

        <div className="flex flex-col tablet:flex-row tablet:justify-between">
          <div className="tablet:w-[50vw]">
            <ul className="font-light text-lg tablet:text-xl my-4 mb-[3rem]">
              <li className="my-4">📌 High-precision facial recognition</li>
              <li className="my-4">📌 Real-time video analytics</li>
              <li className="my-4">📌 Secure and encrypted data storage</li>
              <li className="my-4">📌 User-friendly interface</li>
            </ul>
          </div>
          <div className="tablet:w-[50vw] border-[#161616] border-[3px] bg-[#fefff4] text-[#161616] p-10 rounded-xl">
            <h1 className="font-bold text-xl tablet:text-2xl mb-4">Our Mission - Enhancing Public Safety through Innovative Technology</h1>
            <p>At the Criminal Identification Platform, our mission is to provide law enforcement agencies with cutting-edge facial recognition technology to enhance public safety. Our team of dedicated software engineers and security experts work tirelessly to develop and refine our platform, ensuring its accuracy, reliability, and ease of use.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
