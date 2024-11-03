import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building, Shield, Check } from 'lucide-react';
import { SubscriptionPlan, SubscriptionTier } from '../../types';
import useToast from '../../hooks/useToast';

const organizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  domain: z.string().regex(/^@[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/, 'Invalid domain format (e.g., @company.com)'),
  adminEmail: z.string().email('Invalid email address'),
  adminPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmAdminPassword: z.string(),
  department: z.string().min(2, 'Department name is required'),
  location: z.string().min(2, 'Location is required'),
  timezone: z.string(),
  acceptAdminRole: z.boolean().refine(val => val === true, 'You must accept the admin role responsibilities')
}).refine((data) => data.adminPassword === data.confirmAdminPassword, {
  message: "Passwords don't match",
  path: ["confirmAdminPassword"],
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

const OrganizationSignup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier>('FREE');

  const { register, handleSubmit, formState: { errors } } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      acceptAdminRole: false,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  });

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      tier: 'FREE',
      name: 'Free',
      maxEmployees: 10,
      monthlyPrice: null,
      annualPrice: null,
      features: [
        'Basic performance tracking',
        'Simple goal management',
        'Up to 10 employees',
        'Email support'
      ]
    },
    {
      tier: 'BASIC',
      name: 'Basic',
      maxEmployees: 25,
      monthlyPrice: 99,
      annualPrice: 999,
      features: [
        'Advanced performance tracking',
        'Goal management',
        'Team analytics',
        'Up to 25 employees',
        'Priority email support'
      ]
    },
    {
      tier: 'STANDARD',
      name: 'Standard',
      maxEmployees: 100,
      monthlyPrice: 199,
      annualPrice: 1999,
      recommended: true,
      features: [
        'Custom performance metrics',
        'Advanced analytics',
        'Team collaboration tools',
        'Up to 100 employees',
        'Phone & email support',
        'Data export'
      ]
    },
    {
      tier: 'PREMIUM',
      name: 'Premium',
      maxEmployees: 500,
      monthlyPrice: 299,
      annualPrice: 2999,
      features: [
        'Enterprise-grade features',
        'Custom integrations',
        'Advanced security',
        'Up to 500 employees',
        'Dedicated support',
        'API access',
        'Custom reporting'
      ]
    }
  ];

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      console.log('Organization data:', { ...data, subscriptionTier: selectedPlan });
      addToast('Organization created successfully!', 'success');
      navigate('/login');
    } catch (error) {
      addToast('Failed to create organization', 'error');
    }
  };

  const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => {
    const isSelected = selectedPlan === plan.tier;
    return (
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border-2 transition-all cursor-pointer
          ${isSelected ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}
          ${plan.recommended ? 'ring-2 ring-green-500' : ''}`}
        onClick={() => setSelectedPlan(plan.tier)}
      >
        {plan.recommended && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Recommended
            </span>
          </div>
        )}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
            <div className="mt-2">
              {plan.monthlyPrice ? (
                <>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900 dark:text-white">Free</span>
              )}
            </div>
          </div>
          {isSelected && (
            <div className="bg-indigo-600 rounded-full p-1">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Up to {plan.maxEmployees} team members
          </p>
        </div>

        <ul className="mt-6 space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan) => (
                <PlanCard key={plan.tier} plan={plan} />
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Next: Organization Details
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Organization Details Form - Content remains the same */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Building className="w-6 h-6 mr-2" />
                Organization Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Acme Inc."
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    {...register('domain')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="@company.com"
                  />
                  {errors.domain && (
                    <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Primary Department
                  </label>
                  <input
                    type="text"
                    {...register('department')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Engineering"
                  />
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="New York, USA"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Timezone
                  </label>
                  <select
                    {...register('timezone')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {Intl.supportedValuesOf('timeZone').map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                  {errors.timezone && (
                    <p className="mt-1 text-sm text-red-600">{errors.timezone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Admin Account Setup
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      {...register('adminEmail')}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="admin@company.com"
                    />
                    {errors.adminEmail && (
                      <p className="mt-1 text-sm text-red-600">{errors.adminEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Admin Password
                    </label>
                    <input
                      type="password"
                      {...register('adminPassword')}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.adminPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.adminPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register('confirmAdminPassword')}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.confirmAdminPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmAdminPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      {...register('acceptAdminRole')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      I accept the responsibilities of being an organization administrator
                    </label>
                    {errors.acceptAdminRole && (
                      <p className="mt-1 text-sm text-red-600">{errors.acceptAdminRole.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Back to Plans
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Organization
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Set Up Your Organization
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Get started with PerformancePro in just a few steps
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
              <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
                1
              </span>
              <span className="ml-2">Select Plan</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-300 dark:bg-gray-700'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
              <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
                2
              </span>
              <span className="ml-2">Organization Details</span>
            </div>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default OrganizationSignup;