"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Problem", href: "#problem" },
  { name: "Solution", href: "#solution" },
  { name: "Traction", href: "#traction" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      setScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const linkClass = (isActive) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      darkMode
        ? isActive
          ? "text-blue-400 bg-gray-800"
          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
        : isActive
          ? "text-blue-600 bg-gray-100"
          : "text-gray-700 hover:text-black hover:bg-gray-100"
    }`

  const darkIcon = (
    <motion.svg
      className="w-5 h-5 text-yellow-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      initial={{ rotate: -90 }}
      animate={{ rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </motion.svg>
  )

  const lightIcon = (
    <motion.svg
      className="w-5 h-5 text-gray-700"
      fill="currentColor"
      viewBox="0 0 20 20"
      initial={{ rotate: 90 }}
      animate={{ rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </motion.svg>
  )

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/10"
            : "bg-white/95 backdrop-blur-md shadow-lg"
          : darkMode
            ? "bg-gray-900"
            : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-bold text-2xl cursor-pointer"
          >
            <motion.span
              className={darkMode ? "text-blue-400" : "text-blue-600"}
              animate={{
                color: darkMode ? ["#60A5FA", "#93C5FD", "#60A5FA"] : ["#2563EB", "#3B82F6", "#2563EB"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Memo
            </motion.span>
            <motion.span
              className={darkMode ? "text-cyan-400" : "text-cyan-600"}
              animate={{
                color: darkMode ? ["#22D3EE", "#67E8F9", "#22D3EE"] : ["#0891B2", "#06B6D4", "#0891B2"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
            >
              Tag
            </motion.span>
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={linkClass(activeSection === link.href.substring(1))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`ml-2 px-4 py-2 rounded-full text-sm font-medium ${
                darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
              } transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              Get Started
            </motion.a>
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ml-2 transition-colors duration-300 ${
                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? darkIcon : lightIcon}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full mr-2 ${
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-700 hover:text-black"
              }`}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? darkIcon : lightIcon}
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-700 hover:text-black"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                animate={mobileMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden px-4 pt-2 pb-4 space-y-1 ${darkMode ? "bg-gray-900" : "bg-white"}`}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === link.href.substring(1)
                    ? darkMode
                      ? "text-blue-400 bg-gray-800"
                      : "text-blue-600 bg-gray-100"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-700 hover:text-black hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className={`block text-center px-3 py-2 rounded-md text-base font-medium ${
                darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
