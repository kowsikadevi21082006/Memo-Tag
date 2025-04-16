'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';

export default function Traction({ darkMode }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.8 },
    },
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };
  
  const statCardVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 90, damping: 18, duration: 0.8 }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: `0 10px 25px -5px ${darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.15)'}`,
      transition: { type: 'spring', stiffness: 250, damping: 15 }
    }
  };

  const stats = [
      { value: 50, suffix: '+', text: 'Care Facilities Using MemoTag' },
      { value: 98, suffix: '%', text: 'Positive Feedback from Families' },
      { value: 10, prefix: '', suffix: 'K+', text: 'Individuals Supported' }
  ];

  return (
    <section
      id="traction"
      ref={ref}
      className={`py-24 overflow-hidden relative ${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute right-0 top-0 w-96 h-96 rounded-full ${darkMode ? "bg-blue-900/5" : "bg-blue-100/50"}`}
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className={`absolute -left-32 bottom-0 w-64 h-64 rounded-full ${darkMode ? "bg-cyan-900/5" : "bg-cyan-100/40"}`}
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 3,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div 
            variants={titleVariants}
            className="inline-block mb-4"
          >
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
              Our Impact
            </span>
          </motion.div>
          
          <motion.h2
            variants={titleVariants}
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            } tracking-tight`}
          >
            Our Impact & Traction
          </motion.h2>
          
          <motion.p
            variants={textVariants}
            className={`max-w-3xl mx-auto text-lg md:text-xl ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Demonstrating tangible results and building trust within the dementia care community.
          </motion.p>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 text-center"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    variants={statCardVariants}
                    whileHover="hover"
                    className={`rounded-2xl p-8 lg:p-10 shadow-xl transform transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-800 text-white border border-gray-700' 
                      : 'bg-white text-gray-800 border border-gray-100'
                    }`}
                >
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        darkMode ? "bg-blue-900/30" : "bg-blue-100"
                      }`}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.8 }
                      }}
                    >
                      <svg 
                        className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={index === 0 
                            ? "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                            : index === 1 
                            ? "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" 
                            : "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          } 
                        />
                      </svg>
                    </motion.div>
                    
                    <h3 className={`text-5xl lg:text-6xl font-extrabold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                         {isInView && (
                             <CountUp
                                start={0}
                                end={stat.value}
                                prefix={stat.prefix}
                                suffix={stat.suffix}
                                duration={2.5 + index * 0.4}
                                enableScrollSpy
                                scrollSpyDelay={150}
                             />
                         )}
                    </h3>
                    <p className={`text-base lg:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.text}</p>
                </motion.div>
            ))}
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="mt-16 text-center"
        >
          <motion.a
            href="#contact"
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center px-8 py-3 rounded-full font-medium text-white transition-all duration-300 ${
              darkMode ? "bg-gradient-to-r from-blue-600 to-cyan-500" : "bg-gradient-to-r from-blue-600 to-cyan-600"
            } shadow-lg hover:shadow-xl`}
          >
            Contact Us
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
