import React from 'react';

/**
 * SectionTitle component for consistent page headers
 * @param {string} main - The main title text
 * @param {string} sub - The subtitle or category text
 */
const SectionTitle = ({ main, sub }) => {
  return (
    <div className="relative mb-8">
      {sub && (
        <span className="inline-block text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-3 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          {sub}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
        {main}
      </h2>
      <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
