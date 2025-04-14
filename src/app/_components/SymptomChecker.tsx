'use client';

import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

type Step = 'info' | 'symptoms' | 'conditions' | 'details' | 'treatment';

interface StepConfig {
  id: Step;
  label: string;
}

interface PatientInfo {
  age: string;
  gender: 'male' | 'female' | null;
}

interface SymptomData {
  description: string;
  symptoms: string[];
}

const steps: StepConfig[] = [
  { id: 'info', label: 'INFO' },
  { id: 'symptoms', label: 'SYMPTOMS' },
  { id: 'conditions', label: 'CONDITIONS' },
  { id: 'details', label: 'DETAILS' },
  { id: 'treatment', label: 'TREATMENT' },
] as const;

/**
 * SymptomChecker Component
 * 
 * A multi-step form for symptom analysis and medical condition checking.
 * 
 * @component
 */
export function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    age: '',
    gender: null,
  });
  const [symptomData, setSymptomData] = useState<SymptomData>({
    description: '',
    symptoms: [],
  });

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientInfo(prev => ({ ...prev, age: e.target.value }));
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setPatientInfo(prev => ({ ...prev, gender }));
  };

  const handleSymptomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymptomData(prev => ({ ...prev, description: e.target.value }));
  };

  /**
   * Navigate to the next step
   */
  const nextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep.id);
      }
    }
  };

  /**
   * Navigate to the previous step
   */
  const prevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      if (prevStep) {
        setCurrentStep(prevStep.id);
      }
    }
  };

  const canProceedFromInfo = patientInfo.age && patientInfo.gender;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Progress Indicator */}
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-16">
            <ol className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center ${
                      currentStep === step.id
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-500'
                    }`}
                  >
                    <span className={`px-3 py-2 ${
                      currentStep === step.id
                        ? 'border-b-2 border-blue-600'
                        : ''
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 mx-2" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Step Content */}
            {currentStep === 'info' && (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h1 className="text-2xl font-bold text-gray-900">SymptomTrack</h1>
                  <p className="mt-2 text-sm text-gray-500">
                    This tool is for informational purposes only and is not a substitute for professional medical advice.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      value={patientInfo.age}
                      onChange={handleAgeChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter your age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleGenderSelect('male')}
                        className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium
                          ${patientInfo.gender === 'male'
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        Male
                      </button>
                      <button
                        onClick={() => handleGenderSelect('female')}
                        className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium
                          ${patientInfo.gender === 'female'
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'symptoms' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="symptom" className="block text-sm font-medium text-gray-700">
                      Describe your symptom
                    </label>
                    <input
                      type="text"
                      id="symptom"
                      value={symptomData.description}
                      onChange={handleSymptomChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Type your main symptom here"
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
                    {symptomData.symptoms.length > 0 ? (
                      <ul className="space-y-2">
                        {symptomData.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{symptom}</span>
                            <button
                              onClick={() => setSymptomData(prev => ({
                                ...prev,
                                symptoms: prev.symptoms.filter((_, i) => i !== index)
                              }))}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 text-center">No symptoms added</p>
                    )}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[400px]">
                  <p className="text-sm text-gray-500">3D Body Model Placeholder</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 'info'}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-5 w-5 mr-2" />
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === 'info' && !canProceedFromInfo}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600"
              >
                Continue
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 