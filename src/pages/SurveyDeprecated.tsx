import React from 'react';
import { Link } from 'react-router-dom';

const SurveyDeprecated: React.FC = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto rounded-xl border border-border bg-card p-6 shadow-enterprise">
          <h1 className="text-h2-section mb-2">Survey Moved</h1>
          <p className="text-muted-foreground mb-6">This survey has moved to our new Assessment page.</p>
          <Link
            to="/assessment"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-light transition-colors"
          >
            Go to Assessment
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SurveyDeprecated;
