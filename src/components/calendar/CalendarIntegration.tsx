import React, { useState } from 'react';
import { Calendar, MessageCircle } from 'lucide-react';

interface CalendarIntegrationProps {
  onSchedule: (provider: 'google' | 'outlook') => void;
}

const CalendarIntegration = ({ onSchedule }: CalendarIntegrationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Schedule Meeting
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                onSchedule('google');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <img src="https://www.gstatic.com/images/icons/material/colored_icons/2x/calendar_gm_blue_24dp.png" 
                   alt="Google Calendar" 
                   className="w-5 h-5 mr-3" />
              Google Calendar
            </button>
            <button
              onClick={() => {
                onSchedule('outlook');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <img src="https://img.icons8.com/color/48/000000/microsoft-outlook-2019--v2.png" 
                   alt="Outlook" 
                   className="w-5 h-5 mr-3" />
              Outlook Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarIntegration;