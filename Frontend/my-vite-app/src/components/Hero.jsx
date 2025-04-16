'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Hero({ darkMode }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint
      const response = await axios.post(`${BASE_URL}/api/waitlist`, { email });
      setMessage(response?.data?.message || "Successfully joined the waitlist ");
      setEmail('');
    } catch (error) {
        console.log(error)
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-6xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
          >
            AI for Dementia Care
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`mt-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-xl`}
          >
            Empowering caregivers with real-time insights through cognitive and physical tracking. Our AI platform monitors patterns to provide early detection and personalized care support.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`px-4 py-2 rounded-full border ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} flex-1`}
            />
            <button
              type="submit"
              className={`px-6 py-2 rounded-full font-medium text-white transition-colors duration-300 ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Join Waitlist
            </button>
          </motion.form>

          {message && (
            <p className={`mt-4 text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
              {message}
            </p>
          )}

          <a
            href="#solution"
            className={`inline-block mt-6 px-8 py-3 rounded-full font-medium text-center transition-colors duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            Learn More
          </a>
        </div>

        <motion.div
          className="md:w-1/2 mt-12 md:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            <svg
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                d="M250 140C235 140..." // Replace with actual path
                stroke={darkMode ? '#60A5FA' : '#2563EB'}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <circle cx="200" cy="200" r="8" fill={darkMode ? '#60A5FA' : '#2563EB'} />
                <circle cx="300" cy="200" r="8" fill={darkMode ? '#60A5FA' : '#2563EB'} />
                <circle cx="250" cy="150" r="8" fill={darkMode ? '#60A5FA' : '#2563EB'} />
                <circle cx="250" cy="250" r="8" fill={darkMode ? '#60A5FA' : '#2563EB'} />
              </motion.g>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
