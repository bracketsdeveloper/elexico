import React from 'react';
import VerticalCardProduct from './VerticalCardProduct';
import HorizontalCardProduct from './HorizontalCardProduct';

const NatureImageCard = ({ imageSrc, imageAlt, heading, description,category,catdis }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-green-50 rounded-lg shadow-md overflow-hidden p-6">
      {/* Image on the left (or top on mobile) */}
      <div className="md:w-1/2 w-full mb-4 md:mb-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto rounded-lg object-cover shadow-lg transition-transform transform hover:scale-105"
        />
      </div>
      
      {/* Description on the right (or bottom on mobile) */}
      <div className="md:w-1/2 w-full md:pl-6 text-left">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">{heading}</h2>
        <p className="text-green-700 leading-relaxed text-base">
          {description}
        </p>
        <HorizontalCardProduct category={category} heading={catdis} />
      </div>
    </div>
  );
};

export default NatureImageCard;
