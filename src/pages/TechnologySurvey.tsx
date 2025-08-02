import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

const QUALTRICS_URL = 'https://qualtricsxmnl72x43l7.qualtrics.com/jfe/form/SV_9GH8KCnqcJYdVZA';

export default function TechnologySurvey() {
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    // Loading timeout - if takes > 10 seconds, show manual link
    const timer = setInterval(() => {
      setSecondsElapsed(s => s + 1);
    }, 1000);

    const timeout = setTimeout(() => {
      if (loadState === 'loading') {
        setLoadState('error');
      }
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [loadState]);

  const handleIframeLoad = () => {
    setLoadState('ready');
    console.log('✅ Qualtrics survey loaded successfully');
  };

  const handleIframeError = () => {
    setLoadState('error');
    console.error('❌ Qualtrics iframe failed to load');
  };

  return (
    <div className="fade-in">
      {/* Header - matching Index.tsx style */}
      <header className="container-dashboard py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Technology Perception Survey</h1>
            <p className="text-gray-600 mt-1">Whittier First Day Assessment</p>
          </div>
          <a href="/" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </a>
        </div>
      </header>

      <main className="container-dashboard">
        <div className="card-minimal">
          {/* Loading State */}
          {loadState === 'loading' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading survey... ({secondsElapsed}s)</p>
              {secondsElapsed > 5 && (
                <p className="text-sm text-gray-500 mt-2">
                  Taking longer than expected? 
                  <a 
                    href={QUALTRICS_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Open in new tab
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Error State - Always provide manual access */}
          {loadState === 'error' && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Alternative Access Required</h2>
              <p className="text-gray-700 mb-6">
                The embedded survey is having loading issues. Please use the direct link below.
              </p>
              <a
                href={QUALTRICS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Open Survey in New Tab
              </a>
              <p className="text-sm text-gray-500 mt-4">
                This ensures you can complete the survey without any technical issues.
              </p>
            </div>
          )}

          {/* Qualtrics iFrame */}
          <iframe
            src={QUALTRICS_URL}
            className="w-full border-0 rounded-lg"
            style={{ 
              height: '800px',
              minHeight: '600px',
              display: loadState === 'ready' ? 'block' : 'none'
            }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title="Technology Perception Survey"
            allow="geolocation"
          />

          {/* Success State Footer */}
          {loadState === 'ready' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-green-800">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Survey loaded successfully</p>
                  <p className="text-sm mt-1">
                    Having issues? 
                    <a 
                      href={QUALTRICS_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline ml-1"
                    >
                      Open in a new tab
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Help Section */}
        <div className="card-minimal mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-gray-600 text-sm">
            If you experience any issues with the survey:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• Try refreshing this page</li>
            <li>• Use the "Open in new tab" option</li>
            <li>• Contact support at eric@recovery-compass.org</li>
          </ul>
        </div>
      </main>
    </div>
  );
}