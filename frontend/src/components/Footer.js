import React from 'react';
import { FaInstagram } from "react-icons/fa";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import scrollToTop from '../helpers/scrollToTop';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        {/* Upper Section */}
        <div className="bg-gray-800 shadow-lg rounded-lg">
          <div className="max-w-screen-xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto">
            {/* Logo and Description */}
            <div className="p-5">
              <Link to="/">
                <h3 className="font-bold text-2xl text-white">
                  <Logo />
                </h3>
              </Link>
              <p className="mt-4">
                Your trusted source for high-quality products. We strive to deliver excellence in every aspect of our business.
              </p>
            </div>

            {/* Resources */}
            <div className="p-5">
              <h4 className="text-sm uppercase font-bold text-gray-400 mb-4">
                Resources
              </h4>
              <ul>
                <li className="my-2">
                  <Link
                    to="/about-us"
                    className="hover:text-white transition-colors"
                    onClick={scrollToTop}
                  >
                    About Us
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    to="/blog"
                    className="hover:text-white transition-colors"
                    onClick={scrollToTop}
                  >
                    Blog
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    to="/faq"
                    className="hover:text-white transition-colors"
                    onClick={scrollToTop}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="p-5">
              <h4 className="text-sm uppercase font-bold text-gray-400 mb-4">
                Support
              </h4>
              <ul>
                <li className="my-2">
                  <Link
                    to="/cancellation"
                    className="hover:text-white transition-colors"
                    onClick={scrollToTop}
                  >
                    Cancellation
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    to="/refund-shipping"
                    className="hover:text-white transition-colors"
                    onClick={scrollToTop}
                  >
                    Refund & Shipping
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    to="/contact-support"
                    className="hover:text-white transition-colors"
                    onClick={scrollToTop}
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="p-5">
              <h4 className="text-sm uppercase font-bold text-gray-400 mb-4">
                Contact Us
              </h4>
              <ul>
                <li className="my-2">
                  <a
                    href="mailto:support@example.com"
                    className="hover:text-white transition-colors"
                  >
                    support@example.com
                  </a>
                </li>
                <li className="my-2">
                  <a
                    href="tel:+919999999999"
                    className="hover:text-white transition-colors"
                  >
                    +91 99999 99999
                  </a>
                </li>
                <li className="my-2">
                  <span>
                    1234 Street Name, City, State, Country
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="bg-gray-800 pt-6 mt-4 py-4 rounded-lg shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Social Media */}
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a
                  href="https://www.instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                {/* Add more social icons here if needed */}
              </div>

              {/* Copyright */}
              <div className="text-center md:text-left text-gray-500 mb-4 md:mb-0">
                © {new Date().getFullYear()}. All Rights Reserved.
              </div>

              {/* Powered By */}
              <div className="text-center md:text-right text-gray-500">
                Powered by <a href="" className="hover:text-white transition-colors">Brackets</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
