import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Problem({ darkMode }) {
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
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="problem"
      ref={ref}
      className={`py-24 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
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
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            The Challenge of Dementia Care
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl mx-auto text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Dementia affects millions worldwide, with limited solutions for early
            detection and personalized care.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column: Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">
              The Growing Crisis
            </motion.h3>

            <div className="space-y-8">
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
                <motion.div key={index} variants={itemVariants} className="flex items-center">
                  <div className="mr-4 bg-white bg-opacity-20 rounded-full p-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-blue-100">{item.subtitle}</p>
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
            className={`rounded-2xl p-8 shadow-xl ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <motion.h3
              variants={itemVariants}
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Key Challenges
            </motion.h3>

            <div className="space-y-6">
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
                <motion.div key={index} variants={itemVariants} className="flex">
                  <div
                    className={`flex-shrink-0 mr-4 w-8 h-8 flex items-center justify-center rounded-full ${
                      darkMode ? "bg-blue-500" : "bg-blue-100"
                    }`}
                  >
                    <span
                      className={`text-lg font-bold ${
                        darkMode ? "text-white" : "text-blue-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-1 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {challenge.title}
                    </h4>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {challenge.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
