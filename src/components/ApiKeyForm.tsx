import React, { useState } from 'react';
import { Key } from 'lucide-react';

interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
  error: string | null;
}

export function ApiKeyForm({ onSubmit, error }: ApiKeyFormProps) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(apiKey);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-4 bg-indigo-600 text-white text-center">
          <h1 className="text-2xl font-semibold">Welcome to Mistral AI Chat</h1>
          <p className="text-indigo-100">Please enter your Mistral API key to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <Key className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              Mistral API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your Mistral API key"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Connect to Mistral AI
          </button>
          
          <p className="text-xs text-center text-gray-500">
            Your API key is stored locally and never sent to any server except Mistral AI
          </p>
        </form>
      </div>
    </div>
  );
}