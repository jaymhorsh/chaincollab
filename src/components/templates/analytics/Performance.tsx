import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import React from 'react';

const Performance = () => {
  const data = [
    {
      title: 'DJ LAV Friday Night Vibez',
      views: '200,000',
      completionRate: '87%',
      trend: <ArrowUpRight className="text-green-500" />,
    },
    {
      title: 'Druidz😈 React😂💀💩',
      views: '524,023',
      completionRate: '92%',
      trend: <ArrowUpRight className="text-green-500" />,
    },
    {
      title: 'FIFA 24 Tournament 2024',
      views: '47,000',
      completionRate: '64%',
      trend: <ArrowUpRight className="text-green-500" />,
    },
    {
      title: 'Chess championship Live | 2024',
      views: '200,000',
      completionRate: '87%',
      trend: <ArrowDownLeft className="text-red-500" />,
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-md border shadow-md p-6 border-[#DFE0E1]">
      <h1 className="font-semibold leading-none tracking-tight text-lg text-black pb-6">Top performing Channel</h1>
      <div className="w-full flex items-center justify-center">
        <table className="w-full">
          <thead>
            <tr className="font-bold border-b border-[#DFE0E1]">
              <th className="py-2 text-left">Title</th>
              <th className="py-2 text-left">Total Views</th>
              <th className="py-2 text-left">Avg. Completion Rate</th>
              <th className="py-2 text-left">Trend</th>
            </tr>
          </thead>
          <tbody className="pt-4">
            {data.map((item, index) => (
              <tr key={index} className="border-b  border-[#DFE0E1]">
                <td className="py-5">{item.title}</td>
                <td className="py-5">{item.views}</td>
                <td className="py-5">{item.completionRate}</td>
                <td className="py-5">{item.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Performance;
