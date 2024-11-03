import React, { useState } from 'react';
import { format } from 'date-fns';
import { MessageSquare, Calendar, Plus, Share2, MessageCircle } from 'lucide-react';
import { Feedback } from '../../types';
import QuickFeedbackModal from '../modals/QuickFeedbackModal';
import ScheduleFeedbackModal from '../modals/ScheduleFeedbackModal';
import useToast from '../../hooks/useToast';

const FeedbackList = () => {
  const { addToast, ToastContainer } = useToast();
  const [isQuickFeedbackModalOpen, setIsQuickFeedbackModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([
    {
      id: '1',
      employeeId: '1',
      supervisorId: 'sup1',
      type: 'SCHEDULED',
      content: 'Great progress on the React project. Your technical skills have improved significantly.',
      createdAt: new Date('2024-03-15')
    },
    {
      id: '2',
      employeeId: '1',
      supervisorId: 'sup1',
      type: 'AD_HOC',
      content: 'Excellent presentation in today\'s team meeting. Your communication was clear and engaging.',
      createdAt: new Date('2024-03-20')
    }
  ]);

  const handleQuickFeedback = (data: any) => {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      employeeId: data.employeeId,
      supervisorId: 'sup1', // In real app, this would come from auth context
      type: 'AD_HOC',
      content: data.content,
      createdAt: new Date()
    };

    setFeedbackItems([newFeedback, ...feedbackItems]);
    setIsQuickFeedbackModalOpen(false);
    addToast('Feedback submitted successfully!', 'success');
  };

  const handleScheduleSession = (data: any) => {
    // In a real app, this would create a calendar event
    console.log('Scheduling session:', data);
    setIsScheduleModalOpen(false);
    addToast('Feedback session scheduled successfully!', 'success');
  };

  const handleAddComment = (feedbackId: string) => {
    // In a real app, this would open a comment form
    addToast('Comment feature coming soon!', 'info');
  };

  const handleShare = (feedbackId: string) => {
    // In a real app, this would open a share dialog
    addToast('Share feature coming soon!', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feedback</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-4 py-2 bg-white text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Session
          </button>
          <button 
            onClick={() => setIsQuickFeedbackModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Quick Feedback
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {feedbackItems.map((feedback) => (
          <div key={feedback.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      feedback.type === 'SCHEDULED' 
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
                        : 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                    }`}>
                      {feedback.type === 'SCHEDULED' ? 'Scheduled' : 'Ad-hoc'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {format(feedback.createdAt, 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{feedback.content}</p>
                <div className="mt-4 flex space-x-4">
                  <button 
                    onClick={() => handleAddComment(feedback.id)}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Add Comment
                  </button>
                  <button 
                    onClick={() => handleShare(feedback.id)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <QuickFeedbackModal
        isOpen={isQuickFeedbackModalOpen}
        onClose={() => setIsQuickFeedbackModalOpen(false)}
        onSubmit={handleQuickFeedback}
      />

      <ScheduleFeedbackModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleScheduleSession}
      />

      <ToastContainer />
    </div>
  );
};

export default FeedbackList;