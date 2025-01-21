// SkeletonLoader.js
import React from 'react';
import './SkeletonLoader.css'; // Import the CSS for the skeleton loader

const SkeletonLoader = () => {
  return (
    <div className='skeleton-loader'>
      <div className='skeleton-header'></div>
      <div className='skeleton-image'></div>
      <div className='skeleton-text'></div>
      <div className='skeleton-text'></div>
      <div className='skeleton-button'></div>
    </div>
  );
};

export default SkeletonLoader;
