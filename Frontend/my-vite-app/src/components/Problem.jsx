import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Problem({ darkMode }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
    hover: {
      y: -10,
      boxShadow: darkMode ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="problem"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
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
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
              The Challenge
            </span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            } tracking-tight`}
          >
            The Challenge of Dementia Care
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl mx-auto text-lg md:text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Dementia affects millions worldwide, with limited solutions for early
            detection and personalized care.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column: Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl transform transition-all duration-300"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-8">
              The Growing Crisis
            </motion.h3>

            <div className="space-y-10">
              {[
                {
                  title: "55+ Million",
                  subtitle: "People living with dementia worldwide",
                  icon: (
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    />
                  ),
                },
                {
                  title: "270+ Billion",
                  subtitle: "Annual global cost of dementia care",
                  icon: (
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  ),
                },
                {
                  title: "50-80%",
                  subtitle: "Cases remain undiagnosed worldwide",
                  icon: (
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    />
                  ),
                },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={statsVariants} 
                  className="flex items-center"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className="mr-4 bg-white bg-opacity-20 rounded-full p-3"
                    whileHover={{ 
                      rotate: 360,
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      transition: { duration: 0.8 }
                    }}
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      {item.icon}
                    </svg>
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    >
                      {item.title}
                    </motion.h4>
                    <motion.p 
                      className="text-blue-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                    >
                      {item.subtitle}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column: Challenges */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`rounded-2xl p-8 shadow-xl transform transition-all duration-300 ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <motion.h3
              variants={itemVariants}
              className={`text-2xl font-bold mb-8 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Key Challenges
            </motion.h3>

            <div className="space-y-8">
              {[
                {
                  title: "Late Detection",
                  desc: "Symptoms often go unnoticed until significant cognitive decline has occurred, limiting intervention effectiveness.",
                },
                {
                  title: "Caregiver Burden",
                  desc: "Family caregivers experience high rates of burnout, depression, and financial strain without proper support.",
                },
                {
                  title: "Fragmented Care",
                  desc: "Lack of coordination between healthcare providers, family caregivers, and support services.",
                },
                {
                  title: "Limited Technology",
                  desc: "Few AI-powered tools exist to monitor cognitive patterns and provide personalized care recommendations.",
                },
              ].map((challenge, index) => (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  whileHover="hover"
                  className={`flex p-4 rounded-xl transition-all duration-300 ${
                    darkMode ? "hover:bg-gray-600/50" : "hover:bg-gray-50"
                  }`}
                >
                  <motion.div
                    className={`flex-shrink-0 mr-4 w-10 h-10 flex items-center justify-center rounded-full ${
                      darkMode ? "bg-blue-500" : "bg-blue-100"
                    }`}
                    whileHover={{ 
                      scale: 1.2,
                      backgroundColor: darkMode ? "#3B82F6" : "#DBEAFE",
                      transition: { type: "spring", stiffness: 300, damping: 10 }
                    }}
                  >
                    <span
                      className={`text-lg font-bold ${
                        darkMode ? "text-white" : "text-blue-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </motion.div>
                  <div>
                    <motion.h4
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                      whileHover={{ color: darkMode ? "#60A5FA" : "#2563EB" }}
                    >
                      {challenge.title}
                    </motion.h4>
                    <motion.p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {challenge.desc}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* CTA Button */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-16 text-center"
        >
          <motion.a
            href="#solution"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center px-8 py-3 rounded-full font-medium text-white transition-all duration-300 ${
              darkMode ? "bg-gradient-to-r from-blue-600 to-cyan-500" : "bg-gradient-to-r from-blue-600 to-cyan-600"
            } shadow-lg hover:shadow-xl`}
          >
            Discover Our Solution
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
