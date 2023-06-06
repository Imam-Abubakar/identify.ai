import React from "react";

const Homepage = () => {
  return (
    <div className="w-[95vw] h-full tablet:h-[90vh] mx-auto">
      <div className="mt-10 mx-auto text-center">
        <h1 className="font-bold text-4xl tablet:text-6xl  mt-24">
        Criminal Identification Platform 
        </h1>
        <h3 className="font-medium text-lg tablet:text-xl my-14">
        Revolutionizing Criminal Identification with Cutting-Edge Facial Recognition
        </h3>
        <p className="font-normal w-[80vw] mx-auto text-md h-full tablet:text-xl tablet:my-4 my-10">
        Welcome to our Criminal Identification Platform, where we harness the power of advanced facial recognition technology to assist law enforcement agencies in identifying and apprehending criminals. Our state-of-the-art system is designed to provide accurate and efficient identification, ensuring the safety and security of communities worldwide.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
