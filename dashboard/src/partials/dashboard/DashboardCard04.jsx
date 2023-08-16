import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {

  const chartData = {
    labels: [
      '03-07-2023', '04-06-2023', '05-07-2023', '03-08-2023', '04-05-2023', '05-06-2023',
    ],
    datasets: [
      {
        label: 'Age',
        data: [
          49, 26, 53, 19, 34, 29,
        ],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Criminal Age Distribution</h2>
      </header>
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
