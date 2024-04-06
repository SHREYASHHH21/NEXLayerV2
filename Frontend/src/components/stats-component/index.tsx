import React from 'react';

interface Statistic {
  label: string;
  value: string;
}

interface StatisticCardProps {
  title: string;
  description: string;
  stats: Statistic[];
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, description, stats }) => {
  return (
    <div className="border divide-y rounded shadow-lg">
      <div className="p-6">
        <p className="mb-2 text-lg font-bold">{title}</p>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="grid grid-cols-2 gap-6 p-6">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-lg font-semibold text-gray-800">{stat.label}</p>
            <p className="text-2xl font-bold text-deep-purple-accent-400">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticCard;
