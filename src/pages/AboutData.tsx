import React from "react";

const AboutData: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">About the Data</h1>
      <p className="text-gray-600 mb-4">
        This section links to the Data Dictionary and chart references used in our dashboards.
        These documents live in the public/docs folder so they can be served statically by Vite.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a className="text-blue-600 underline" href="/docs/data-dictionary.md" target="_blank" rel="noreferrer">
            Data Dictionary (Markdown)
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="/docs/charts.md" target="_blank" rel="noreferrer">
            Charts Reference (Markdown)
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutData;
