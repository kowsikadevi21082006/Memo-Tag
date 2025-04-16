// /components/Traction.jsx
'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function Traction({ darkMode }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="traction"
      ref={ref}
      className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Our Impact & Traction
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl mx-auto text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            MemoTag is transforming dementia care with proven results and strong partnerships.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center"
        >
          <motion.div
            variants={itemVariants}
            className={`rounded-2xl p-6 shadow-lg ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <h3 className="text-4xl font-bold mb-2">50+</h3>
            <p className="text-lg">Care Facilities Using MemoTag</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`rounded-2xl p-6 shadow-lg ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <h3 className="text-4xl font-bold mb-2">98%</h3>
            <p className="text-lg">Positive Feedback from Families</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`rounded-2xl p-6 shadow-lg ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <h3 className="text-4xl font-bold mb-2">10K+</h3>
            <p className="text-lg">Memory Tags Created</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
