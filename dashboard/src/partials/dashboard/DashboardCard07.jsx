import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import DateAgeFormatter from "../../components/DateAgeFormatter"

function DashboardCard07() {
  const API_BASE_URL = "https://5000-imamabubakar-identifyai-m8w3es7skny.ws-eu103.gitpod.io";
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
    <>
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-bold text-3xl pb-2 text-slate-800 dark:text-slate-100 border-b-[0.1px] border-b-slate-400">
            Recently Added Criminals
          </h2>
        </header>
        <div className="p-3">
          {/* Table */}

          {userData.length === 0 ? (
            <div className="text-slate-800 uppercase text-center py-6 font-semibold text-2xl dark:text-slate-100">
              No data yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Criminal</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Age</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Crime</div>
                    </th>

                  </tr>
                </thead>
                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {userData?.map((entry, index) => (
                    <tr key={entry._id}>
                      <td className="p-2 text-center">
                        <div className="flex flex-row justify-start items-center mx-auto">
                          <img
                            className="m-2 w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full"
                            src={entry?.mugshot}
                            alt="userImage"
                          />
                          <div className="text-center">{`${entry?.firstName} ${entry?.lastName}`}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center uppercase">
                          {entry?.criminalRecord}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-row justify-center items-center mx-auto">
                          <div className="text-center"><DateAgeFormatter inputDate={entry?.dateOfBirth} /></div>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardCard07;
