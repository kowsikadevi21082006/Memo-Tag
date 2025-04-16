'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function ContactForm({ darkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/contact`, formData);
      setStatus(response?.data?.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <motion.div
          className="w-full h-full flex justify-center items-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://img.freepik.com/free-photo/portrait-smiling-young-doctors-standing-together-portrait-medical-staff-inside-modern-hospital-smiling-camera_657921-885.jpg?t=st=1744735129~exp=1744738729~hmac=f36467879e5eff99cfb727a93d2383af97f8d711066fe872c1acb3a8a5c22da6&w=996"
            alt="Contact"
            className="rounded-3xl shadow-lg object-cover w-full h-96"
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          className={`p-8 rounded-3xl shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-5 py-3 rounded-full border outline-none transition duration-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' : 'bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500'}`}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-5 py-3 rounded-full border outline-none transition duration-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' : 'bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500'}`}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className={`w-full px-5 py-3 rounded-2xl border outline-none transition duration-300 resize-none ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' : 'bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500'}`}
            />
            <button
              type="submit"
              className={`w-full py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Send Message
            </button>
          </form>

          {status && (
            <motion.p
              className={`mt-4 text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
