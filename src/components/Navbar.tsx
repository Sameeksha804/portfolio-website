import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  const codingProfiles = [
    {
      name: 'GitHub',
      url: 'https://github.com/sameeksha804',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/sameeksha804',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.653 1.653 0 0 0 0 2.226 1.653 1.653 0 0 0 2.226 0l2.939-3.141 2.939 3.141a1.653 1.653 0 0 0 2.226 0 1.653 1.653 0 0 0 0-2.226l-3.854-4.126 5.406-5.788A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.374 1.374 0 0 0-.961.438l-5.406 5.788-3.854 4.126a1.653 1.653 0 0 0 0 2.226 1.653 1.653 0 0 0 2.226 0l2.939-3.141 2.939 3.141a1.653 1.653 0 0 0 2.226 0 1.653 1.653 0 0 0 0-2.226l-3.854-4.126 5.406-5.788a1.374 1.374 0 0 0-.961-.438z"/>
        </svg>
      )
    }
  ];

  const handleResumeClick = () => {
    setShowResumeModal(true);
  };

  const handleDownloadResume = () => {
    const resumeUrl = '/Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sameeksha_Shrivastava_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm shadow-lg"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                    <span className="relative z-10 text-[#FB923C] transition-colors duration-300 group-hover:text-[#FB923C] font-medium">
                      {link.label}
                    </span>
                  </div>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FB923C] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
              <motion.button
                onClick={handleResumeClick}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                  <span className="relative z-10 text-[#FB923C] transition-colors duration-300 group-hover:text-[#FB923C] font-medium">
                    Resume
                  </span>
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FB923C] transition-all duration-300 group-hover:w-full" />
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {codingProfiles.map((profile) => (
                  <motion.a
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10 flex items-center gap-2">
                      <span className="relative z-10 text-[#FB923C] transition-colors duration-300 group-hover:text-[#FB923C]">
                        {profile.icon}
                      </span>
                      <span className="relative z-10 text-[#FB923C] transition-colors duration-300 group-hover:text-[#FB923C] font-medium">
                        {profile.name}
                      </span>
                    </div>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FB923C] transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                ))}
              </div>

              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                      <span className="relative z-10 text-[#FB923C] transition-colors duration-300 group-hover:text-[#FB923C] font-medium flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        Top
                      </span>
                    </div>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FB923C] transition-all duration-300 group-hover:w-full" />
                  </motion.button>
                )}
              </AnimatePresence>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-[#1F2937] rounded-lg p-6 max-w-2xl w-full mx-4 relative"
          >
            <button
              onClick={() => setShowResumeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Resume</h2>
              <p className="text-gray-600 dark:text-gray-300">Click below to view or download my resume</p>
            </div>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="px-6 py-3 bg-[#FB923C] text-white rounded-lg font-medium hover:bg-[#EA580C] transition-colors duration-300"
              >
                Download Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/Resume.pdf', '_blank')}
                className="px-6 py-3 bg-white dark:bg-[#374151] text-gray-900 dark:text-white rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#4B5563] transition-colors duration-300"
              >
                View Resume
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar; 