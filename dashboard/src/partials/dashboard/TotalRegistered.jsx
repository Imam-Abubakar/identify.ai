import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Icon from '../../images/icon-01.svg';


function TotalRegistered() {
  const API_BASE_URL = "https://identify-api-jf4t.onrender.com";
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();


  const getAllUsers = () => {
    axios
      .get(`${API_BASE_URL}/criminals`)
      .then(function (response) {

        setUserData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Total Registered Criminals</h2>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-4">{userData.length}</div>
        </div>
      </div>
    </div>
  );
}

export default TotalRegistered;
