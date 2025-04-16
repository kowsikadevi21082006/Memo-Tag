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
      id="solution"
      ref={ref}
      className={`py-24 ${darkMode ? "bg-gray-900" : "bg-white"}`}
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
            className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            How MemoTag Works
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Our AI-powered platform combines physical and cognitive tracking to provide personalized dementia care insights.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}