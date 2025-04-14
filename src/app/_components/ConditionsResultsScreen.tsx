'use client';

import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Condition {
  id: string;
  name: string;
  confidence: number;
  description: string;
}

interface UserInfo {
  age: number;
  gender: 'male' | 'female';
}

interface ConditionsResultsScreenProps {
  onNext: () => void;
  onBack: () => void;
  onStartOver: () => void;
  symptoms: string[];
  userInfo: UserInfo;
}

// Mock data - replace with actual condition data
const mockConditions: Condition[] = [
  {
    id: '1',
    name: 'Common Cold',
    confidence: 85,
    description: 'A viral infection of the upper respiratory tract.',
  },
  {
    id: '2',
    name: 'Influenza',
    confidence: 65,
    description: 'A contagious respiratory illness caused by influenza viruses.',
  },
  {
    id: '3',
    name: 'Allergic Rhinitis',
    confidence: 45,
    description: 'An allergic response to airborne allergens.',
  },
];

/**
 * ConditionsResultsScreen Component
 * 
 * Displays possible medical conditions based on user symptoms and demographics.
 * 
 * @component
 */
export function ConditionsResultsScreen({
  onNext,
  onBack,
  onStartOver,
  symptoms,
  userInfo,
}: ConditionsResultsScreenProps) {
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Possible Conditions</h2>
            <button
              onClick={onStartOver}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              Start Over
            </button>
          </div>

          <div className="space-y-4">
            {mockConditions.map(condition => (
              <div
                key={condition.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCondition?.id === condition.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedCondition(condition)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{condition.name}</h3>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${condition.confidence}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {condition.confidence}% match
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">User Information</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-900">
                  Age: <span className="font-medium">{userInfo.age}</span>
                </p>
                <p className="text-sm text-gray-900">
                  Gender: <span className="font-medium capitalize">{userInfo.gender}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Selected Symptoms</h3>
              <ul className="mt-2 space-y-1">
                {symptoms.map((symptom, index) => (
                  <li key={index} className="text-sm text-gray-900">
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onBack}
              className="w-full text-sm text-blue-600 hover:text-blue-800"
            >
              Edit Symptoms
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedCondition}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Continue
          <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
} 