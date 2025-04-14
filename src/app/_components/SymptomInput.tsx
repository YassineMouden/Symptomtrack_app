'use client';

import { useState } from 'react';
import { api } from "~/trpc/react";
import { InteractiveBodyModel } from "./InteractiveBodyModel";

/**
 * Message interface for chat history
 */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * SymptomInput Component
 * 
 * A form component that allows users to input symptoms and receive AI analysis.
 * Integrates with the InteractiveBodyModel for body part selection.
 * 
 * @component
 */
export function SymptomInput() {
  // State management
  const [symptoms, setSymptoms] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // tRPC mutation for symptom analysis
  const analyzeSymptoms = api.ai.analyzeSymptoms.useMutation({
    onMutate: () => {
      setIsLoading(true);
      addMessage('user', symptoms);
    },
    onSuccess: (data) => {
      addMessage('assistant', data.analysis);
      setSymptoms('');
      setAnalysis(data.analysis);
    },
    onError: (error) => {
      const errorMessage = `Error: ${error.message}`;
      addMessage('assistant', errorMessage);
      setError(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  /**
   * Adds a new message to the conversation history
   * @param role - The role of the message sender
   * @param content - The content of the message
   */
  const addMessage = (role: 'user' | 'assistant', content: string) => {
    setMessages(prev => [...prev, {
      role,
      content,
      timestamp: new Date(),
    }]);
  };

  /**
   * Handles form submission
   * @param e - The form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      const fullSymptoms = `${selectedBodyPart ? `[${selectedBodyPart}] ` : ''}${symptoms}`;
      analyzeSymptoms.mutate({ symptoms: fullSymptoms });
    }
  };

  /**
   * Handles body part selection from the 3D model
   * @param partName - The name of the selected body part
   */
  const handleBodyPartSelected = (partName: string) => {
    setSelectedBodyPart(partName);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <InteractiveBodyModel onPartSelected={handleBodyPartSelected} />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
            Describe your symptoms
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
            placeholder="Enter your symptoms here..."
            disabled={isLoading}
          />
        </div>

        {selectedBodyPart && (
          <div className="text-sm text-gray-600">
            Selected body part: <span className="font-medium">{selectedBodyPart}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isLoading || !symptoms.trim()}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {analysis && (
        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{analysis}</p>
        </div>
      )}

      {messages.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Conversation History</h3>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-md ${
                message.role === 'user' ? 'bg-indigo-50' : 'bg-gray-50'
              }`}
            >
              <p className="text-sm text-gray-700">{message.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {message.role} • {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 