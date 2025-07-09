import React from 'react';

const features = [
  { title: 'AI-Powered Analysis', desc: 'Advanced algorithms analyze your resume like a hiring manager would.' },
  { title: 'Job-Targeted Feedback', desc: 'Get specific recommendations tailored to your target position.' },
  { title: 'Improve Your Score', desc: 'Track your progress and optimize for better results.' },
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {features.map((item, index) => (
        <div key={index} className="border dark:border-gray-700 p-4 rounded-md">
          <h3 className="font-medium mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;

