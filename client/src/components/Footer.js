import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 text-white">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} TODO App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
