import React from 'react';
import Icon from '../../images/icon-03.svg';

function TotalScanned() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Total No. of Scans</h2>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-4">36</div>
        </div>
      </div>
    </div>
  );
}

export default TotalScanned;
