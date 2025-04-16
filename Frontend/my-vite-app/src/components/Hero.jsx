import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Hero({ darkMode }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Replace with your backend API endpoint
      const response = await axios.post(`${BASE_URL}/api/waitlist`, { email });
      setMessage(response?.data?.message || "Successfully joined the waitlist!");
      setEmail('');
      
      // Add confetti effect on successful submission
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        createConfetti(rect.x + rect.width / 2, rect.y);
      }
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simple confetti effect
  const createConfetti = (x, y) => {
    const colors = ['#60A5FA', '#34D399', '#A78BFA', '#F472B6'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.zIndex = '9999';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 5 + 5}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      
      document.body.appendChild(confetti);
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 5 + 3;
      const tx = x + Math.cos(angle) * 200 * Math.random();
      const ty = y + Math.sin(angle) * 200 * Math.random();
      
      // Animate the confetti
      confetti.animate(
        [
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${tx - x}px, ${ty - y}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ],
        {
          duration: Math.random() * 1000 + 1000,
          easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        }
      ).onfinish = () => confetti.remove();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95 
    }
  };

  const brainPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { type: "spring", duration: 2.5, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      {/* Animated background elements */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center relative z-10">
        <motion.div 
          className="md:w-1/2 md:pr-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
              Introducing MemoTag
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-4xl md:text-6xl font-bold leading-tight ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
          >
            AI for Dementia Care
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`mt-6 text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-xl leading-relaxed`}
          >
            Empowering caregivers with real-time insights through cognitive and physical tracking. Our AI platform monitors patterns to provide early detection and personalized care support.
          </motion.p>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <motion.input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-6 py-3 rounded-full border ${
                  darkMode 
                    ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-400' 
                    : 'bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300`}
                whileFocus={{ scale: 1.02 }}
              />
              {isSubmitting && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-8 py-3 rounded-full font-medium text-white transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' 
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
              } shadow-lg`}
            >
              Join Waitlist
            </motion.button>
          </motion.form>

          {message && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}
            >
              {message}
            </motion.p>
          )}

          <motion.a
            href="#solution"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(243, 244, 246, 0.8)'
            }}
            className={`inline-flex items-center mt-8 px-8 py-3 rounded-full font-medium text-center transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Learn More
            <motion.svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              animate={{ 
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.a>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-full max-w-md">
            {/* Brain visualization */}
            <svg
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-2xl"
            >
              {/* Brain outline */}
              <motion.path
                d="M250 100C180 100 120 160 120 230C120 300 180 360 250 360C320 360 380 300 380 230C380 160 320 100 250 100Z"
                stroke={darkMode ? '#60A5FA' : '#2563EB'}
                strokeWidth="4"
                strokeLinecap="round"
                variants={brainPathVariants}
                initial="hidden"
                animate="visible"
                fill={darkMode ? 'rgba(30, 58, 138, 0.1)' : 'rgba(219, 234, 254, 0.5)'}
              />
              
              {/* Neural connections */}
              <motion.path
                d="M250 100C250 100 200 150 250 200C300 250 350 200 350 200"
                stroke={darkMode ? '#60A5FA' : '#2563EB'}
                strokeWidth="3"
                strokeLinecap="round"
                variants={brainPathVariants}
                initial="hidden"
                animate="visible"
              />
              
              <motion.path
                d="M150 200C150 200 200 250 250 200C300 150 250 100 250 100"
                stroke={darkMode ? '#60A5FA' : '#2563EB'}
                strokeWidth="3"
                strokeLinecap="round"
                variants={brainPathVariants}
                initial="hidden"
                animate="visible"
              />
              
              <motion.path
                d="M150 200C150 200 200 150 250 200C300 250 350 200 350 200"
                stroke={darkMode ? '#60A5FA' : '#2563EB'}
                strokeWidth="3"
                strokeLinecap="round"
                variants={brainPathVariants}
                initial="hidden"
                animate="visible"
              />
              
              <motion.path
                d="M250 360C250 360 300 310 250 260C200 210 150 260 150 260"
                stroke={darkMode ? '#60A5FA' : '#2563EB'}
                strokeWidth="3"
                strokeLinecap="round"
                variants={brainPathVariants}
                initial="hidden"
                animate="visible"
              />
              
              <motion.path
                d="M350 260C350 260 300 210 250 260C200 310 250 360 250 360"
                stroke={darkMode ? '#60A5FA' : '#2563EB'}
                strokeWidth="3"
                strokeLinecap="round"
                variants={brainPathVariants}
                initial="hidden"
                animate="visible"
              />
              
              <motion.path
                d="M350 260C350 260 300 310 250 260C200 210 150 260 150 260"
                stroke={darkMode ? '#60A5FA' : '#2563EB'}
                strokeWidth="3"
                strokeLinecap="round"
                variants={brainPathVariants}
                initial="hidden"
                animate="visible"
              />
              
              {/* Neural nodes */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 2,
                  staggerChildren: 0.1
                }}
              >
                <motion.circle 
                  cx="250" cy="100" r="10" 
                  fill={darkMode ? '#60A5FA' : '#2563EB'} 
                  variants={pulseVariants}
                  animate="pulse"
                />
                <motion.circle 
                  cx="150" cy="200" r="10" 
                  fill={darkMode ? '#60A5FA' : '#2563EB'} 
                  variants={pulseVariants}
                  animate="pulse"
                />
                <motion.circle 
                  cx="350" cy="200" r="10" 
                  fill={darkMode ? '#60A5FA' : '#2563EB'} 
                  variants={pulseVariants}
                  animate="pulse"
                />
                <motion.circle 
                  cx="250" cy="200" r="15" 
                  fill={darkMode ? '#34D399' : '#10B981'} 
                  variants={pulseVariants}
                  animate="pulse"
                />
                <motion.circle 
                  cx="150" cy="260" r="10" 
                  fill={darkMode ? '#60A5FA' : '#2563EB'} 
                  variants={pulseVariants}
                  animate="pulse"
                />
                <motion.circle 
                  cx="350" cy="260" r="10" 
                  fill={darkMode ? '#60A5FA' : '#2563EB'} 
                  variants={pulseVariants}
                  animate="pulse"
                />
                <motion.circle 
                  cx="250" cy="260" r="10" 
                  fill={darkMode ? '#60A5FA' : '#2563EB'} 
                  variants={pulseVariants}
                  animate="pulse"
                />
                <motion.circle 
                  cx="250" cy="360" r="10" 
                  fill={darkMode ? '#60A5FA' : '#2563EB'} 
                  variants={pulseVariants}
                  animate="pulse"
                />
              </motion.g>
              
              {/* Data flow animations */}
              <motion.circle
                cx="250"
                cy="100"
                r="5"
                fill={darkMode ? '#F472B6' : '#EC4899'}
                animate={{
                  pathOffset: [0, 1],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                }}
                style={{ offsetPath: "path('M250 100C250 100 200 150 250 200C300 250 350 200 350 200')" }}
              />
              
              <motion.circle
                cx="150"
                cy="200"
                r="5"
                fill={darkMode ? '#A78BFA' : '#8B5CF6'}
                animate={{
                  pathOffset: [0, 1],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
                style={{ offsetPath: "path('M150 200C150 200 200 150 250 200C300 250 350 200 350 200')" }}
              />
              
              <motion.circle
                cx="250"
                cy="360"
                r="5"
                fill={darkMode ? '#34D399' : '#10B981'}
                animate={{
                  pathOffset: [0, 1],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 2,
                }}
                style={{ offsetPath: "path('M250 360C250 360 300 310 250 260C200 210 150 260 150 260')" }}
              />
            </svg>
            
            {/* Glowing effect */}
            <motion.div
              className={`absolute inset-0 rounded-full blur-3xl -z-10 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-500/10'}`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
