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
    <div className="min-h-screen bg-gradient-to-br from-wfd-sunset-light via-wfd-gold-light to-wfd-primary-light">
      {/* Brand Header */}
      <header className="bg-gradient-to-r from-wfd-primary via-wfd-sunset to-wfd-gold shadow-lg">
        <div className="container-dashboard py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/afbdd2d6-a84b-471a-a0cb-05b4a50829ee.png" 
                alt="Whittier First Day Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-md">Technology Perception Survey</h1>
                <p className="text-white/90 mt-1 font-medium">Whittier First Day Assessment</p>
              </div>
            </div>
            <a 
              href="/" 
              className="text-white hover:text-wfd-gold-light transition-colors duration-200 font-medium bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="container-dashboard py-8">
        {/* Main Survey Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-wfd-primary/10 to-wfd-sunset/10 p-6 border-b border-wfd-primary/20">
            <h2 className="text-xl font-semibold text-wfd-primary mb-2">Complete Your Assessment</h2>
            <p className="text-gray-700">Please take a few minutes to complete this technology perception survey.</p>
          </div>

          {/* Loading State */}
          {loadState === 'loading' && (
            <div className="text-center py-16 px-6">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-wfd-gold/30 border-t-wfd-sunset mx-auto mb-6"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-wfd-primary mx-auto animate-ping opacity-20"></div>
              </div>
              <p className="text-wfd-primary font-medium text-lg">Loading survey... ({secondsElapsed}s)</p>
              {secondsElapsed > 5 && (
                <div className="mt-4 p-4 bg-wfd-gold/10 rounded-lg border border-wfd-gold/20">
                  <p className="text-sm text-gray-700">
                    Taking longer than expected? 
                    <a 
                      href={QUALTRICS_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-wfd-sunset hover:text-wfd-primary transition-colors ml-1 font-medium underline"
                    >
                      Open in new tab
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {loadState === 'error' && (
            <div className="p-8">
              <div className="bg-gradient-to-br from-wfd-gold/10 to-wfd-sunset/10 border-2 border-wfd-gold/30 rounded-xl p-8 text-center">
                <div className="bg-wfd-gold/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-wfd-sunset" />
                </div>
                <h2 className="text-2xl font-bold text-wfd-primary mb-3">Alternative Access Required</h2>
                <p className="text-gray-700 mb-8 max-w-md mx-auto">
                  The embedded survey is having loading issues. Please use the direct link below to ensure a smooth experience.
                </p>
                <a
                  href={QUALTRICS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-wfd-sunset to-wfd-primary text-white rounded-xl hover:from-wfd-primary hover:to-wfd-sunset transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                >
                  <ExternalLink className="w-5 h-5 mr-3" />
                  Open Survey in New Tab
                </a>
                <p className="text-sm text-gray-600 mt-6 bg-white/50 rounded-lg p-3 max-w-md mx-auto">
                  This ensures you can complete the survey without any technical issues.
                </p>
              </div>
            </div>
          )}

          {/* Qualtrics iFrame */}
          <iframe
            src={QUALTRICS_URL}
            className="w-full border-0"
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
            <div className="mx-6 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center text-green-800">
                  <div className="bg-green-100 rounded-full p-1 mr-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Survey loaded successfully</p>
                    <p className="text-sm mt-1 text-green-700">
                      Having issues? 
                      <a 
                        href={QUALTRICS_URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-800 hover:text-green-900 underline ml-1 font-medium"
                      >
                        Open in a new tab
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-wfd-primary/10 rounded-full p-3 flex-shrink-0">
              <svg className="w-6 h-6 text-wfd-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-wfd-primary text-lg mb-3">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                If you experience any issues with the survey, try these solutions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-wfd-primary/5 to-wfd-sunset/5 p-4 rounded-lg border border-wfd-primary/10">
                  <p className="text-sm font-medium text-wfd-primary mb-1">Refresh Page</p>
                  <p className="text-xs text-gray-600">Try refreshing this page</p>
                </div>
                <div className="bg-gradient-to-br from-wfd-sunset/5 to-wfd-gold/5 p-4 rounded-lg border border-wfd-sunset/10">
                  <p className="text-sm font-medium text-wfd-sunset mb-1">New Tab</p>
                  <p className="text-xs text-gray-600">Use the "Open in new tab" option</p>
                </div>
                <div className="bg-gradient-to-br from-wfd-gold/5 to-wfd-primary/5 p-4 rounded-lg border border-wfd-gold/10">
                  <p className="text-sm font-medium text-wfd-gold mb-1">Contact Support</p>
                  <p className="text-xs text-gray-600">eric@recovery-compass.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}