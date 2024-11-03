import React from 'react';
import { format } from 'date-fns';
import { Users, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { CalibrationSession } from '../../types';

const CalibrationList = () => {
  const sessions: CalibrationSession[] = [
    {
      id: '1',
      date: new Date('2024-06-10'),
      department: 'Engineering',
      participants: ['John Smith', 'Sarah Johnson', 'Michael Chen'],
      notes: 'Review Q2 performance ratings and align on evaluation criteria.',
      decisions: [
        'Standardized evaluation metrics for technical skills',
        'Updated rating scale definitions',
        'Identified high-potential employees'
      ],
      status: 'SCHEDULED'
    }
  ];

  const getStatusColor = (status: CalibrationSession['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-50';
      case 'IN_PROGRESS':
        return 'text-blue-600 bg-blue-50';
      case 'SCHEDULED':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: CalibrationSession['status']) => {
    switch (status) {
      case 'COMPLETED':
        return CheckCircle2;
      case 'IN_PROGRESS':
      case 'SCHEDULED':
        return Clock;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Calibration Sessions</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Schedule Session
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => {
          const StatusIcon = getStatusIcon(session.status);
          return (
            <div key={session.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {session.department} Calibration
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(session.status)}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {session.status.replace('_', ' ')}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {format(session.date, 'MMMM d, yyyy')} at {format(session.date, 'h:mm a')}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{session.participants.length} Participants</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Session Notes</h4>
                <p className="text-gray-700">{session.notes}</p>
              </div>

              {session.decisions.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Key Decisions</h4>
                  <ul className="space-y-2">
                    {session.decisions.map((decision, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-700">
                        <div className="w-2 h-2 mt-2 bg-indigo-400 rounded-full"></div>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex space-x-4">
                <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
                  View Details
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit Session
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalibrationList;