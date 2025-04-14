'use client';

import { useState } from 'react';
import { InteractiveBodyModel } from './InteractiveBodyModel';
import { SymptomSelectionModal } from './SymptomSelectionModal';

interface SymptomInputScreenProps {
  onNext: () => void;
  onBack: () => void;
}

/**
 * SymptomInputScreen Component
 * 
 * A split-screen layout for entering symptoms and selecting body parts.
 * 
 * @component
 */
export function SymptomInputScreen({ onNext, onBack }: SymptomInputScreenProps) {
  const [mainSymptom, setMainSymptom] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBodyPartSelected = (partName: string) => {
    setSelectedBodyPart(partName);
    setIsModalOpen(true);
  };

  const handleAddSymptom = () => {
    if (mainSymptom.trim() && !symptoms.includes(mainSymptom)) {
      setSymptoms([...symptoms, mainSymptom]);
      setMainSymptom('');
    }
  };

  const handleAddSymptomsFromModal = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Text Input */}
        <div className="space-y-4">
          <div>
            <label htmlFor="mainSymptom" className="block text-sm font-medium text-gray-700">
              Main Symptom
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="mainSymptom"
                value={mainSymptom}
                onChange={(e) => setMainSymptom(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Type your main symptom here"
              />
              <button
                onClick={handleAddSymptom}
                disabled={!mainSymptom.trim()}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>

          {/* Selected Symptoms List */}
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms</h3>
            {symptoms.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No symptoms added yet</p>
            ) : (
              <ul className="space-y-2">
                {symptoms.map((symptom, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm text-gray-700"
                  >
                    <span>{symptom}</span>
                    <button
                      onClick={() => setSymptoms(symptoms.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right side - 3D Model */}
        <div className="h-[400px] bg-gray-100 rounded-md overflow-hidden relative">
          <InteractiveBodyModel onPartSelected={handleBodyPartSelected} />
          {selectedBodyPart && (
            <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-md shadow-sm">
              <p className="text-sm text-gray-700">
                Selected: <span className="font-medium">{selectedBodyPart}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={symptoms.length === 0}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Continue
        </button>
      </div>

      {/* Symptom Selection Modal */}
      {selectedBodyPart && (
        <SymptomSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bodyPart={selectedBodyPart}
          onAddSymptom={handleAddSymptomsFromModal}
        />
      )}
    </div>
  );
} 