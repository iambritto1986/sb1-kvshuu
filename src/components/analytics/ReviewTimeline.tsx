import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ReviewTimelineData {
  month: string;
  completed: number;
  pending: number;
}

interface ReviewTimelineProps {
  data: ReviewTimelineData[];
}

const ReviewTimeline = ({ data }: ReviewTimelineProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Completion Timeline</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" name="Completed Reviews" fill="#4F46E5" stackId="a" />
            <Bar dataKey="pending" name="Pending Reviews" fill="#FFA500" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReviewTimeline;