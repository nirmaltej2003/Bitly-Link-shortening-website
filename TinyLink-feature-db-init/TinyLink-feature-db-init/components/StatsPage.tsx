'use client';

import Link from 'next/link';
import { BarChart, ArrowLeft, ExternalLink, Calendar, MousePointer } from 'lucide-react';

interface LinkData {
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string | null;
  created_at: string;
}

export default function StatsPage({ link }: { link: LinkData }) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Link Statistics</h1>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Short Code
              </label>
              <p className="text-2xl font-mono font-bold text-indigo-600 mt-1">/{link.code}</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Target URL
              </label>
              <a
                href={link.target_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg text-gray-900 hover:text-indigo-600 mt-1 break-all"
              >
                {link.target_url}
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-600">Total Clicks</span>
                </div>
                <p className="text-4xl font-bold text-indigo-600">{link.clicks}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Created</span>
                </div>
                <p className="text-sm font-semibold text-green-600">{formatDate(link.created_at)}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">Last Clicked</span>
                </div>
                <p className="text-sm font-semibold text-purple-600">{formatDate(link.last_clicked)}</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={`/${link.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Test Redirect
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}