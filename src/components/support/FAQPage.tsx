import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      category: 'Subscription',
      question: 'How do I upgrade my plan?',
      answer: 'To upgrade your plan, go to Settings > Subscription and select your desired plan. You can choose between Basic, Standard, and Premium plans, each offering different features and user limits.'
    },
    {
      category: 'Team Management',
      question: 'How do I add or remove team members?',
      answer: 'Managers and Admins can add team members from the Team page using the "Add Team Member" button. To remove a member, locate them in the team list and use the remove option in their settings menu.'
    },
    {
      category: 'Security',
      question: 'Who can access my data?',
      answer: 'Your data is secure and accessible only to authorized team members based on their roles. Employees can view their own data, managers can access their team\'s data, and admins have organization-wide access.'
    },
    {
      category: 'Support',
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the Contact Us page, by email at support@performancepro.com, or by submitting a support ticket from your dashboard.'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-8">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {category}
            </h2>
            <div className="space-y-4">
              {faqs
                .filter(faq => faq.category === category)
                .map((faq, index) => {
                  const itemIndex = categoryIndex * 100 + index;
                  const isOpen = openItem === itemIndex;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                    >
                      <button
                        onClick={() => setOpenItem(isOpen ? null : itemIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 dark:text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Still have questions?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Can't find the answer you're looking for? Please contact our support team.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FAQPage;