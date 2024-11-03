import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatIntegrationProps {
  employeeEmail: string;
  onChat: (provider: 'teams' | 'slack', email: string) => void;
}

const ChatIntegration = ({ employeeEmail, onChat }: ChatIntegrationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
      >
        <MessageCircle className="w-4 h-4 inline mr-1" />
        Chat
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                onChat('teams', employeeEmail);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <img src="https://img.icons8.com/color/48/000000/microsoft-teams.png" 
                   alt="Microsoft Teams" 
                   className="w-5 h-5 mr-3" />
              Teams Chat
            </button>
            <button
              onClick={() => {
                onChat('slack', employeeEmail);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <img src="https://img.icons8.com/color/48/000000/slack-new.png" 
                   alt="Slack" 
                   className="w-5 h-5 mr-3" />
              Slack DM
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatIntegration;