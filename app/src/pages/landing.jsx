import React, { useState } from 'react';
import Step1Imd from "../assets/logo.png";

const Landing = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex justify-center p-4 h-screen bg-idy text-white">
      <div className="w-full">
        {step === 1 && (
          <div className='h-screen flex justify-between flex-col text-center items-center gap-5'>
            <img src={Step1Imd} alt='Image 1' className='w-[15rem] mt-[8rem]' />
            <h2 className="text-3xl font-bold mb-4">Say goodbye to misidentification</h2>
            {/* Step 1 content */}
            <button
              onClick={handleNextStep}
              className="w-[90vw] bg-idy border-[1px] hover:bg-idy-light font-medium border-white text-white px-4 mb-16 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Step 2</h2>
            {/* Step 2 content */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Step 3</h2>
            {/* Step 3 content */}
            <button
              onClick={handlePrevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={() => alert('Onboarding complete!')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4"
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
