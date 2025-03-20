'use client';
import { AnalyticCard } from '@/components/Card/Card';
import { usePrivy } from '@privy-io/react-auth';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useViewerMetrics } from '@/app/hook/useViewerMetrics';

const Analytics = () => {
  const { viewMetrics, loading, error } = useViewerMetrics({  });  
  const insightsData = [
    {
      title: 'Total Views',
      views: viewMetrics?.viewCount || 0,
      value: -11.02,
      change: '30 from last stream',
    },
    {
      title: 'Total Watch time',
      playtimeMins: viewMetrics?.playtimeMins
        ? `${Math.floor(viewMetrics.playtimeMins / 60)}h:${(viewMetrics.playtimeMins % 60).toFixed(1)}m`
        : '0h:0.0m',
      value: 11.02,
      change: '30 from last stream',
    }
  ];

  const [filteredInsights, setFilteredInsights] = useState(insightsData);
  const [activeFilter, setActiveFilter] = useState('all');
  const handleFilterChange = (filterType: string) => {
    setActiveFilter(filterType);
    setFilteredInsights(insightsData); // Update filtering logic as needed
  };
  return (
    <div className="grid bg-white grid-cols-2 gap-6 md:grid-cols-4 p-6 rounded-lg">
    {insightsData.map((insightsData) => (
        <AnalyticCard key={insightsData.title} {...insightsData} />))}
       
   
      <div className="w-full h-full">
        <ul className="flex flex-col gap-y-2 h-full">
          {['all', 'thisMonth', 'lastMonth'].map((filter) => (
            <li
              key={filter}
              className={clsx(
                'text-sm pl-2 py-1 text-black-tertiary-text cursor-pointer font-semibold',
                activeFilter === filter && 'border-l-4 text-black-primary-text border-main-blue',
              )}
              onClick={() => handleFilterChange(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1).replace(/([A-Z])/g, ' $1')}
            </li>
          ))}
          <div className="flex justify-start items-end w-2/3 h-full">
            <button
              className="w-full font-semibold text-black-primary-text text-sm flex justify-center items-center py-2 border bg-background-gray rounded-md self-end"
              onClick={() => handleFilterChange('all')}
            >
              View All
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
