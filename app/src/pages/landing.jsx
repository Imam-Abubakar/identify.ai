import React, { useState } from 'react';
import Step1Imd from "../assets/logo-name.png";

const Landing = () => {
  return (
    <div className="flex justify-center p-4 h-screen bg-white text-white">
      <div className="w-full">
        <div className='h-screen flex justify-center flex-col text-center items-center gap-1'>
          <img src={Step1Imd} alt='Image 1' className='w-[10rem] ' />
          <h2 className="text-sm font-al-400 text-black mt-[-15px] mb-12">Say goodbye to misidentification</h2>

          <a href='/register'>
            <button
              className="w-[90vw] border-black border-[2px] hover:bg-black hover:text-white font-semibold  text-black px-4 mb-1 py-2"
            >
              Get Started
            </button>
          </a>

          <a href='/login'>
            <button
              className="w-[90vw] bg-black border-[2px] hover:border-black hover:text-black hover:bg-white font-semibold border-white text-white px-4 mb-16 py-2"
            >
              Login
            </button>
          </a>

        </div>
      </div>
    </div>
  );
};

export default Landing;
