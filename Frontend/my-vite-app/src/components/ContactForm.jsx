'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import axios from 'axios';

export default function ContactForm({ darkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(formRef, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/contact`, formData);
      setStatus(response?.data?.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      
      // Add success animation
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        createSuccessRipple(rect.x + rect.width / 2, rect.y + rect.height / 2);
      }
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success ripple effect
  const createSuccessRipple = (x, y) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.backgroundColor = darkMode ? '#34D399' : '#10B981';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.zIndex = '9999';
    
    document.body.appendChild(ripple);
    
    ripple.animate(
      [
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(100)' }
      ],
      {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    ).onfinish = () => ripple.remove();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
        delay: 0.3
      }
    }
  };

  const inputVariants = {
    focus: { 
      scale: 1.02,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <section
      id="contact"
      className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute -right-40 top-20 w-96 h-96 rounded-full ${darkMode ? "bg-blue-900/10" : "bg-blue-100/50"}`}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className={`absolute -left-20 bottom-40 w-80 h-80 rounded-full ${darkMode ? "bg-purple-900/10" : "bg-purple-100/40"}`}
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Image Section */}
        <motion.div
          className="w-full h-full flex justify-center items-center"
          variants={imageVariants}
          initial="hidden"
          animate={controls}
          ref={formRef}
        >
          <motion.div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
            <motion.img
              src="https://img.freepik.com/free-photo/portrait-smiling-young-doctors-standing-together-portrait-medical-staff-inside-modern-hospital-smiling-camera_657921-885.jpg?t=st=1744735129~exp=1744738729~hmac=f36467879e5eff99cfb727a93d2383af97f8d711066fe872c1acb3a8a5c22da6&w=996"
              alt="Contact"
              className="object-cover w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Overlay gradient */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-t ${
                darkMode ? "from-gray-900/80 to-transparent" : "from-gray-800/50 to-transparent"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            
            {/* Text overlay */}
            <motion.div 
              className="absolute bottom-0 left-0 p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
              <p className="text-gray-200">Our team is ready to answer your questions</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className={`p-8 rounded-3xl shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
          variants={formVariants}
          initial="hidden"
          animate={controls}
          whileHover={{ 
            boxShadow: darkMode ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="mb-2">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                Contact Us
              </span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants} 
              className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Let's Start a Conversation
            </motion.h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants}>
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-4 rounded-xl border outline-none transition duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' 
                      : 'bg-gray-50 text-gray-800 border-gray-200 focus:border-blue-500'
                  }`}
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-4 rounded-xl border outline-none transition duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' 
                      : 'bg-gray-50 text-gray-800 border-gray-200 focus:border-blue-500'
                  }`}
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <motion.textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-4 rounded-xl border outline-none transition duration-300 resize-none ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' 
                      : 'bg-gray-50 text-gray-800 border-gray-200 focus:border-blue-500'
                  }`}
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                  } shadow-lg relative overflow-hidden`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {status && (
            <motion.div
              className={`mt-6 p-4 rounded-xl ${
                status.includes('success') || status.includes('Successfully')
                  ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                  : darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium flex items-center">
                {status.includes('success') || status.includes('Successfully') ? (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {status}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
