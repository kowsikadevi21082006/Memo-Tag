import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Solution({ darkMode }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

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

  // Features data
  const features = [
    {
      title: "AI-Powered Monitoring",
      description: "Advanced algorithms track cognitive patterns and physical movements to detect early signs of decline.",
      icon: "brain-circuit",
    },
    {
      title: "Real-time Insights",
      description: "Caregivers receive instant notifications and personalized recommendations based on behavioral changes.",
      icon: "activity",
    },
    {
      title: "Personalized Care Plans",
      description: "Our system adapts to each individual's unique needs, creating customized care strategies.",
      icon: "clipboard-list",
    },
  ];

  return (
    <section
      id="solution"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute -right-20 -top-20 w-96 h-96 rounded-full ${darkMode ? "bg-blue-900/10" : "bg-blue-100/50"}`}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className={`absolute -left-32 bottom-0 w-64 h-64 rounded-full ${darkMode ? "bg-cyan-900/10" : "bg-cyan-100/50"}`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
              Our Technology
            </span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"} tracking-tight`}
          >
            How MemoTag Works
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl mx-auto text-lg md:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Our AI-powered platform combines physical and cognitive tracking to provide personalized dementia care insights.
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: darkMode ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { type: "spring", stiffness: 300, damping: 15 }
              }}
              className={`rounded-2xl p-8 text-center transition-all duration-300 ${
                darkMode 
                  ? "bg-gray-800 border border-gray-700 hover:border-blue-500/50" 
                  : "bg-white border border-gray-100 shadow-lg hover:border-blue-200"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </motion.div>
              
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
                {feature.title}
              </h3>
              
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-16 text-center"
        >
          <motion.a
            href="#contact"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center px-8 py-3 rounded-full font-medium text-white transition-all duration-300 ${
              darkMode ? "bg-gradient-to-r from-blue-600 to-cyan-500" : "bg-gradient-to-r from-blue-600 to-cyan-600"
            } shadow-lg hover:shadow-xl`}
          >
            Learn More
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
