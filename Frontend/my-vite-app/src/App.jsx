// pages/index.jsx
import { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Traction from './components/Traction';
import ContactForm from './components/ContactForm';


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
   
        <title>Dementia Care</title>
        <meta
          name="description"
          content="AI-powered platform for dementia care, providing real-time insights through cognitive and physical tracking."
        />
        <link rel="icon" href="/favicon.ico" />
      
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex flex-col items-center justify-center">
        <Hero darkMode={darkMode} />
        <Problem darkMode={darkMode} />
        <Solution darkMode={darkMode} />
        <Traction darkMode={darkMode} />
        <ContactForm darkMode={darkMode} />
      </main>
    </div>
  );
}
