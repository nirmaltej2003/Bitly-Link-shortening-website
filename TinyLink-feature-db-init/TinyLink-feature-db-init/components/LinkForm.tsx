'use client';

import { useState } from 'react';

interface LinkFormProps {
  onSuccess: (link: any) => void;
  onCancel: () => void;
}

export default function LinkForm({ onSuccess, onCancel }: LinkFormProps) {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [codeError, setCodeError] = useState('');

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const validateCode = (code: string) => {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
  };

  const handleSubmit = async () => {
    setUrlError('');
    setCodeError('');

    if (!validateUrl(longUrl)) {
      setUrlError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    if (customCode && !validateCode(customCode)) {
      setCodeError('Code must be 6-8 alphanumeric characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl, customCode }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setCodeError('This code already exists. Please choose another.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create link');
      }

      onSuccess(data);
      setLongUrl('');
      setCustomCode('');
    } catch (err) {
      setUrlError('Failed to create link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Long URL *</label>
          <input
            type="text"
            value={longUrl}
            onChange={(e) => {
              setLongUrl(e.target.value);
              setUrlError('');
            }}
            placeholder="https://example.com/very-long-url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {urlError && <p className="text-red-600 text-sm mt-1">{urlError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Code (optional)</label>
          <input
            type="text"
            value={customCode}
            onChange={(e) => {
              setCustomCode(e.target.value);
              setCodeError('');
            }}
            placeholder="docs123 (6-8 characters)"
            maxLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {codeError && <p className="text-red-600 text-sm mt-1">{codeError}</p>}
          <p className="text-gray-500 text-xs mt-1">Leave empty for auto-generated code</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating...' : 'Create Short Link'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}