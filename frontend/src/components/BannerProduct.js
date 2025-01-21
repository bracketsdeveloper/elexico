import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const desktopImages = [
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
];

const mobileImages = [
  '/assets/banners/prak2.jpg',
  '/assets/banners/prak3.jpg',
  '/assets/banners/prak4.jpg',
  '/assets/banners/prak5.jpg',
  '/assets/banners/prakOils.jpg',
];

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Determine the current set of images based on screen size
  const images = isDesktop ? desktopImages : mobileImages;
  const totalImages = images.length;

  // Function to navigate to the next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  // Function to navigate to the previous image
  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextImage, 4000); // Change image every 4 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentImage, totalImages]);

  // Handle screen resize to switch between desktop and mobile images
  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      if (isNowDesktop !== isDesktop) {
        setIsDesktop(isNowDesktop);
        setCurrentImage(0); // Reset to first image on screen size change
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop]);

  return (
    <div className="container mx-auto my-5 " >
      <div className="relative h-96 md:h-[500px] w-full bg-gray-900 rounded overflow-hidden">
        {/* Images Container */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((imageUrl, index) => (
            <div className="w-full flex-shrink-0" key={`banner-${index}`}>
              <img
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={previousImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full shadow-lg focus:outline-none transition-opacity"
          aria-label="Previous Slide"
        >
          <FaAngleLeft size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full shadow-lg focus:outline-none transition-opacity"
          aria-label="Next Slide"
        >
          <FaAngleRight size={20} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImage ? 'bg-white' : 'bg-gray-500'
              } transition-colors`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
