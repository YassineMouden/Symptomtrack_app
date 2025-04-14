'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SymptomSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bodyPart: string;
  onAddSymptom: (symptom: string) => void;
}

interface Symptom {
  id: string;
  name: string;
  isCommon: boolean;
}

// Mock data - replace with actual symptom data
const mockSymptoms: Symptom[] = [
  { id: '1', name: 'Pain', isCommon: true },
  { id: '2', name: 'Swelling', isCommon: true },
  { id: '3', name: 'Redness', isCommon: true },
  { id: '4', name: 'Stiffness', isCommon: true },
  { id: '5', name: 'Numbness', isCommon: false },
  { id: '6', name: 'Tingling', isCommon: false },
  { id: '7', name: 'Weakness', isCommon: false },
  { id: '8', name: 'Limited movement', isCommon: true },
];

/**
 * SymptomSelectionModal Component
 * 
 * A modal dialog for selecting symptoms related to a specific body part.
 * 
 * @component
 */
export function SymptomSelectionModal({
  isOpen,
  onClose,
  bodyPart,
  onAddSymptom,
}: SymptomSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'common'>('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  if (!isOpen) return null;

  const filteredSymptoms = mockSymptoms.filter(symptom => {
    const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || (activeTab === 'common' && symptom.isCommon);
    return matchesSearch && matchesTab;
  });

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAddSelected = () => {
    selectedSymptoms.forEach(symptomId => {
      const symptom = mockSymptoms.find(s => s.id === symptomId);
      if (symptom) {
        onAddSymptom(symptom.name);
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            Select Symptoms for {bodyPart}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Search and Tabs */}
        <div className="p-4 border-b">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search symptoms..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Symptoms
            </button>
            <button
              onClick={() => setActiveTab('common')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'common'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Common Symptoms
            </button>
          </div>
        </div>

        {/* Symptoms List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredSymptoms.map(symptom => (
              <label
                key={symptom.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom.id)}
                  onChange={() => handleSymptomToggle(symptom.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{symptom.name}</span>
                {symptom.isCommon && (
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    Common
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSelected}
            disabled={selectedSymptoms.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Add Selected Symptoms
          </button>
        </div>
      </div>
    </div>
  );
} 