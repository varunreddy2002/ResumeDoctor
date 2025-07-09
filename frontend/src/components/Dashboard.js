import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis || 'No analysis found.';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">📊 AI Resume Analysis Report</h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 border border-gray-300 dark:border-gray-700">
          {analysis.split('\n').map((line, index) => (
            <p
              key={index}
              className={`${
                line.startsWith('**') && line.endsWith('**')
                  ? 'text-xl font-semibold mt-4'
                  : line.startsWith('* ')
                  ? 'pl-4 list-disc ml-6'
                  : ''
              } whitespace-pre-wrap`}
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
              }}
            />
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
