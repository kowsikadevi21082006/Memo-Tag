// components/Navbar.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Problem', href: '#problem' },
  { name: 'Solution', href: '#solution' },
  { name: 'Traction', href: '#traction' },
  { name: 'ContactForm', href: '#contactform' },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = `px-3 py-2 rounded-md text-sm font-medium ${
    darkMode
      ? 'text-gray-300 hover:text-white'
      : 'text-gray-700 hover:text-black'
  }`;

  const darkIcon = (
    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const lightIcon = (
    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-10 shadow-md ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-2xl cursor-pointer"
          >
            <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
              Memo
            </span>
            <span className={darkMode ? 'text-cyan-400' : 'text-cyan-600'}>
              Tag
            </span>
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={linkClass}>
                {link.name}
              </a>
            ))}
            <a
              href="#cta"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Get Started
            </a>
            <button onClick={toggleDarkMode} className="p-2 rounded-full">
              {darkMode ? darkIcon : lightIcon}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full mr-2"
            >
              {darkMode ? darkIcon : lightIcon}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${
                darkMode
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden px-4 pt-4 pb-4 space-y-2 ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  darkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#cta"
              className={`block text-center px-3 py-2 rounded-md text-base font-medium ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
