import React, { useState } from 'react';
import { User } from '../../types';
import { Users, Star, Target, MessageSquare, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddTeamMemberModal from '../modals/AddTeamMemberModal';
import useToast from '../../hooks/useToast';
import ViewMemberGoalsModal from '../modals/ViewMemberGoalsModal';

interface ChatIntegration {
  type: 'teams' | 'slack';
  url: string;
}

interface TeamMember extends User {
  activeGoals: number;
  lastReviewDate: string;
  performance: number;
  chatIntegrations: ChatIntegration[];
}

const TeamList = () => {
  const navigate = useNavigate();
  const { addToast, ToastContainer } = useToast();
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [selectedMemberGoals, setSelectedMemberGoals] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'EMPLOYEE',
      department: 'Engineering',
      reportsTo: 'John Smith',
      activeGoals: 4,
      lastReviewDate: 'Mar 15, 2024',
      performance: 4.5,
      chatIntegrations: [
        { type: 'teams', url: 'https://teams.microsoft.com/l/chat/0/0?users=sarah.j@company.com' },
        { type: 'slack', url: 'slack://user?team=T0123456&id=U0123456' }
      ]
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      role: 'EMPLOYEE',
      department: 'Engineering',
      reportsTo: 'John Smith',
      activeGoals: 3,
      lastReviewDate: 'Mar 10, 2024',
      performance: 4.2,
      chatIntegrations: [
        { type: 'teams', url: 'https://teams.microsoft.com/l/chat/0/0?users=michael.c@company.com' },
        { type: 'slack', url: 'slack://user?team=T0123456&id=U0123457' }
      ]
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.d@company.com',
      role: 'EMPLOYEE',
      department: 'Engineering',
      reportsTo: 'John Smith',
      activeGoals: 5,
      lastReviewDate: 'Mar 20, 2024',
      performance: 4.8,
      chatIntegrations: [
        { type: 'teams', url: 'https://teams.microsoft.com/l/chat/0/0?users=emily.d@company.com' },
        { type: 'slack', url: 'slack://user?team=T0123456&id=U0123458' }
      ]
    }
  ]);

  const handleAddMember = (data: any) => {
    const newMember: TeamMember = {
      id: `${teamMembers.length + 1}`,
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
      reportsTo: 'John Smith',
      activeGoals: 0,
      lastReviewDate: 'Not reviewed',
      performance: 0,
      chatIntegrations: [
        { type: 'teams', url: `https://teams.microsoft.com/l/chat/0/0?users=${data.email}` },
        { type: 'slack', url: `slack://user?team=T0123456&id=U${Date.now()}` }
      ]
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsAddMemberModalOpen(false);
    addToast('Team member added successfully!', 'success');
  };

  const handleScheduleMeeting = (email: string) => {
    const googleUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?add=${email}`;
    const outlookUrl = `https://outlook.office.com/calendar/0/deeplink/compose?to=${email}`;
    const calendarChoice = window.confirm('Choose calendar:\nOK for Google Calendar\nCancel for Outlook');
    window.open(calendarChoice ? googleUrl : outlookUrl, '_blank');
  };

  const handleChatOpen = (chatIntegrations: ChatIntegration[], name: string) => {
    const choice = window.confirm(`Open chat with ${name} in:\nOK for Microsoft Teams\nCancel for Slack`);
    const integration = chatIntegrations.find(i => i.type === (choice ? 'teams' : 'slack'));
    if (integration) {
      window.open(integration.url, '_blank');
    }
  };

  const handleViewGoals = (memberId: string) => {
    setSelectedMemberGoals(memberId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h1>
        <button 
          onClick={() => setIsAddMemberModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Users className="w-5 h-5 mr-2" />
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((teamMember) => (
          <div key={teamMember.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                    {teamMember.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{teamMember.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{teamMember.department}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Active Goals</span>
                <span className="font-medium text-gray-900 dark:text-white">{teamMember.activeGoals}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Last Review</span>
                <span className="font-medium text-gray-900 dark:text-white">{teamMember.lastReviewDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Performance</span>
                <span className="font-medium text-green-600">{teamMember.performance}/5</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button 
                onClick={() => handleScheduleMeeting(teamMember.email)}
                className="flex-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-400 dark:hover:bg-indigo-900/75"
              >
                <Calendar className="w-4 h-4 inline mr-1" />
                Schedule
              </button>
              <button 
                onClick={() => handleChatOpen(teamMember.chatIntegrations, teamMember.name)}
                className="flex-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-400 dark:hover:bg-indigo-900/75"
              >
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Chat
              </button>
              <button 
                onClick={() => handleViewGoals(teamMember.id)}
                className="flex-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-400 dark:hover:bg-indigo-900/75"
              >
                <Target className="w-4 h-4 inline mr-1" />
                Goals
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddTeamMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMember}
      />

      <ViewMemberGoalsModal
        isOpen={!!selectedMemberGoals}
        onClose={() => setSelectedMemberGoals(null)}
        memberId={selectedMemberGoals}
        memberName={teamMembers.find(m => m.id === selectedMemberGoals)?.name || ''}
      />

      <ToastContainer />
    </div>
  );
};

export default TeamList;