import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="w-[90%] max-w-[1300px] mx-auto flex flex-wrap justify-between gap-5">
        <div className="flex-1 min-w-[280px] max-w-[300px] mb-8">
          <h5 className="text-xl font-semibold text-orange-500 mb-4">Contact Us</h5>
          <p className="text-white"><FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> +254 768 647 160</p>
          <p className="text-white"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> info@jagedo.co.ke</p>
        </div>

        <div className="flex-1 min-w-[280px] max-w-[300px] mb-8">
          <h5 className="text-xl font-semibold text-orange-500 mb-4">Construction Info</h5>
          <ul className="list-none p-0">
            <li className="mb-2">
              <a href="#" className="text-white hover:text-orange-500 transition-colors duration-300">Why JaGedo?</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:text-orange-500 transition-colors duration-300">Project Process</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:text-orange-500 transition-colors duration-300">Available Professionals</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:text-orange-500 transition-colors duration-300">Success Stories</a>
            </li>
          </ul>
        </div>

        <div className="flex-1 min-w-[280px] max-w-[300px] mb-8">
          <h5 className="text-xl font-semibold text-orange-500 mb-4">Newsletter</h5>
          <p className="text-white mb-4">Subscribe for construction updates.</p>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="p-2 border border-white rounded-md bg-white bg-opacity-10 text-white placeholder-gray-400 w-[90%]"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="p-2 border border-white rounded-md bg-white bg-opacity-10 text-white placeholder-gray-400 w-[90%]"
            />
            <button
              type="submit"
              className="px-8 py-3 text-white bg-gradient-to-r from-red-600 to-orange-600 rounded-full hover:shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex-1 min-w-[280px] max-w-[300px] mb-8 text-center">
          <h5 className="text-xl font-semibold text-orange-500 mb-4">Follow Us for Project Updates!</h5>
          <div className="flex flex-col items-center gap-5">
            <a href="#" className="text-white text-2xl hover:text-orange-500 transition-colors duration-300">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="text-white text-2xl hover:text-orange-500 transition-colors duration-300">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-white text-2xl hover:text-orange-500 transition-colors duration-300">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-white text-2xl hover:text-orange-500 transition-colors duration-300">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>

        <div className="flex-1 min-w-[280px] max-w-[300px] mb-8 text-right">
          <h5 className="text-xl font-semibold text-orange-500 inline mr-2">Help</h5>
          <div className="inline-flex items-center gap-4">
            <a href="#faq-section" className="text-white hover:text-orange-500 transition-colors duration-300">FAQs</a>
            <span className="text-white">|</span>
            <a href="#" className="text-white hover:text-orange-500 transition-colors duration-300">Support</a>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 border-t border-gray-700">
        <p className="text-white m-0">© {new Date().getFullYear()} JaGedo. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;