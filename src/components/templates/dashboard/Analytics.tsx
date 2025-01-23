'use client';
import { AnalyticCard } from '@/components/Card/Card';
import clsx from 'clsx';
import React, { useState } from 'react';

const Analytics = () => {
  const insightsData = [
    {
      title: 'Views',
      views: 7265,
      value: -11.02,
      change: '25 from last stream',
    },
    {
      title: 'New Users',
      views: 420,
      value: +11.02,
      change: '25 from last stream',
    },
    {
      title: 'Active Users',
      views: 500,
      value: -11.02,
      change: '25 from last stream',
    },
  ];
  const [filteredInsights, setFilteredInsights] = useState(insightsData);
  const [activeFilter, setActiveFilter] = useState('all');
  const handleFilterChange = (filterType: string) => {
    setActiveFilter(filterType);
    setFilteredInsights(insightsData); // Update filtering logic as needed
  };
  return (
    <div className="grid bg-white grid-cols-2 gap-6 md:grid-cols-4 p-6 rounded-lg">
      {filteredInsights.map((insight) => (
        <AnalyticCard key={insight.title} {...insight} />
      ))}
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
