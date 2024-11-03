import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { SubscriptionPlan, SubscriptionTier } from '../../types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_sample');

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  currentTier: SubscriptionTier;
  onSelect: (tier: SubscriptionTier) => void;
}

const PaymentForm = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/settings`,
        },
      });

      if (submitError) {
        setError(submitError.message || 'An error occurred');
      } else {
        onSuccess();
      }
    } catch (e) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Confirm Payment'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const SubscriptionCard = ({ plan, currentTier, onSelect }: SubscriptionCardProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const isCurrentPlan = plan.tier === currentTier;

  const handleUpgrade = async () => {
    // In development, simulate successful upgrade
    if (process.env.NODE_ENV === 'development') {
      onSelect(plan.tier);
      return;
    }
    setShowPayment(true);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border-2 ${
      isCurrentPlan ? 'border-indigo-600' : 'border-transparent'
    }`}>
      {!showPayment ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.monthlyPrice}</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              ${plan.annualPrice}/year (save ${(plan.monthlyPrice * 12 - plan.annualPrice).toFixed(2)})
            </p>
          </div>

          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgrade}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
              isCurrentPlan
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-default'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            disabled={isCurrentPlan}
          >
            {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upgrade to {plan.name}
            </h3>
          </div>
          <Elements stripe={stripePromise}>
            <PaymentForm
              onSuccess={() => {
                onSelect(plan.tier);
                setShowPayment(false);
              }}
              onCancel={() => setShowPayment(false)}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;