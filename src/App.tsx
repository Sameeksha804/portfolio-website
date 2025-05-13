import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import emailjs from '@emailjs/browser';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
  }

  @keyframes floatFirst {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(-10px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes floatSecond {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(-8px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .name-animation {
    animation: floatFirst 3s ease-in-out infinite;
    opacity: 1;
  }

  .name-animation-delayed {
    animation: floatSecond 3s ease-in-out infinite;
    animation-delay: 1.5s;
    opacity: 1;
  }

  h1 {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1em;
  }

  .tracking-wider {
    letter-spacing: 0.15em;
  }

  .tracking-widest {
    letter-spacing: 0.2em;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function App() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const projects = [
    {
      id: 1,
      title: "Crop Recommendation System",
      shortDesc: "A machine learning-based tool to enhance precision agriculture by recommending optimal crops based on soil and meteorological data.",
      longDesc: "Developed a sophisticated machine learning model that analyzes various soil parameters and weather conditions to provide accurate crop recommendations. The system helps farmers make data-driven decisions, optimizing crop selection for maximum yield and sustainability. Implemented using Random Forest algorithm and integrated with KNIME for data processing and visualization.",
      technologies: ["Python", "Machine Learning", "KNIME"],
      image: "/images/project1.jpg"
    },
    {
      id: 2,
      title: "AI Research Assistant",
      shortDesc: "A web-based assistant that fetches academic papers, analyzes their content, and provides insightful summaries and answers to user queries.",
      longDesc: "Built an intelligent research assistant that streamlines the academic paper analysis process. The system automatically fetches relevant papers from arXiv, processes them using advanced NLP techniques, and provides comprehensive summaries and answers to specific research questions. Features include semantic search, document analysis, and interactive query interface.",
      technologies: ["Gradio", "LangChain", "Qdrant", "Ollama", "arXiv API", "PyPDF2"],
      image: "/images/project2.jpg"
    },
    {
      id: 3,
      title: "Personal Portfolio Website",
      shortDesc: "A fully responsive portfolio website built to showcase my resume, projects, and skills using modern front-end technologies.",
      longDesc: "Designed and developed a modern, responsive portfolio website with smooth animations and interactive elements. The site features a clean, professional design with optimized performance and accessibility. Includes dynamic content loading, responsive layouts, and modern UI/UX practices.",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      image: "/images/project3.jpg"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        message: formData.message,
        to_name: 'Sameeksha',
      };

      await emailjs.send(
        'service_sam804',
        'template_aubyvh4',
        templateParams,
        '92rtD6wgkz6D19sg8'
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#FED7AA] dark:from-[#030712] dark:via-[#111827] dark:to-[#FB923C]">
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#111827]/20 via-[#1F2937]/20 to-[#FED7AA]/20 animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#FED7AA]/20 via-[#1F2937]/30 to-[#111827]/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#111827]/30 via-[#FED7AA]/20 to-[#1F2937]/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-[#1F2937]/30 via-[#111827]/30 to-[#FED7AA]/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/40 via-[#1F2937]/40 to-[#FED7AA]/30 dark:from-[#030712]/30 dark:via-[#111827]/30 dark:to-[#FB923C]/20 animate-gradient" />
        
        {/* Additional Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FED7AA]/10 via-[#1F2937]/20 to-[#111827]/30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-bl from-[#111827]/30 via-[#1F2937]/20 to-[#FED7AA]/10 animate-pulse animation-delay-2000" />
        
        {/* Color Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#111827] via-[#1F2937]/50 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1F2937] via-[#FED7AA]/30 to-transparent opacity-20" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#EC4899] rounded-full blur-3xl opacity-30 animate-pulse" />
                <img
                  src={process.env.PUBLIC_URL + '/images/profile.jpg'}
                  alt="Sameeksha Shrivastava"
                  className="relative w-full h-full object-cover rounded-full border-4 border-[#F97316]/30 shadow-xl"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F97316]/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#EC4899]/20 rounded-full blur-xl animate-pulse" />
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <div className="relative">
                <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-wider">
                  <div className="relative flex items-center">
                    <span className="text-[#F97316] text-8xl md:text-9xl font-black tracking-wider">S</span>
                    <motion.span
                      className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#EC4899] tracking-wider name-animation"
                    >
                      <span className="text-6xl md:text-7xl font-black uppercase tracking-widest whitespace-nowrap">ameeksha</span>
                    </motion.span>
                  </div>
                  <div className="relative">
                    <motion.span
                      className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#EC4899] to-[#F97316] tracking-wider name-animation-delayed text-5xl md:text-6xl font-black uppercase tracking-widest whitespace-nowrap"
                    >
                      Shrivastava
                    </motion.span>
                  </div>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-[#F8FAFC] mb-8 subtitle-font font-light tracking-wide">
                Data Analyst & UI/UX Enthusiast
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90"
                >
                  View Projects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-[#F8FAFC]/10 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-[#F97316]/30 hover:bg-[#F97316]/20"
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section id="about" className="section fade-in bg-gradient-to-r from-[#F97316]/30 via-[#FBBF24]/30 to-[#EC4899]/30 dark:from-[#F97316]/20 dark:via-[#FBBF24]/20 dark:to-[#EC4899]/20 p-8 rounded-2xl my-12 backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#EC4899]">About Me</h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="card bg-[#F8FAFC]/10 dark:bg-[#1E293B]/60 backdrop-blur-sm rounded-2xl border border-[#F97316]/30 p-8">
              <h3 className="text-2xl font-semibold mb-8 text-[#F97316]">Introduction</h3>
              <p className="text-[#1E293B] dark:text-[#F8FAFC] leading-relaxed">
                I am Sameeksha Shrivastava, a final-year B.Tech Biotechnology student with a passion for solving complex problems through smart, user-centric solutions. With strong coding and leadership abilities, I combine technical skills in Python, machine learning, and data analytics with a design thinking mindset. As the team leader of E-Cell NIET, I thrive in collaborative, innovative environments.
              </p>
            </div>

            <div className="card bg-[#F8FAFC]/10 dark:bg-[#1E293B]/60 backdrop-blur-sm rounded-2xl border border-[#EC4899]/30 p-8">
              <h3 className="text-2xl font-semibold mb-8 text-[#EC4899]">Skills</h3>
              
              {/* Programming Languages */}
              <div className="mb-8">
                <h4 className="text-xl font-medium text-[#F97316] mb-4">Programming Languages</h4>
                <div className="flex flex-wrap gap-3">
                  {['Python', 'R', 'SQL'].map((skill) => (
                    <span key={skill} className="text-[#1E293B] dark:text-[#F8FAFC] text-lg px-4 py-2 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/80 rounded-full border border-[#F97316]/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="mb-8">
                <h4 className="text-xl font-medium text-[#F97316] mb-4">Technical Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Machine Learning',
                    'Data Analytics',
                    'HTML & CSS',
                    'UI/UX Design'
                  ].map((skill) => (
                    <span key={skill} className="text-[#1E293B] dark:text-[#F8FAFC] text-lg px-4 py-2 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/80 rounded-full border border-[#EC4899]/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Platforms */}
              <div>
                <h4 className="text-xl font-medium text-[#F97316] mb-4">Tools & Platforms</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Visual Studio Code',
                    'Jupyter Notebook',
                    'Google Colab',
                    'KNIME',
                    'Power BI',
                    'MySQL Workbench',
                    'MS Excel'
                  ].map((tool) => (
                    <span key={tool} className="text-[#1E293B] dark:text-[#F8FAFC] text-lg px-4 py-2 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/80 rounded-full border border-[#F97316]/30">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section fade-in bg-gradient-to-r from-[#1F2937]/30 via-[#7C2D12]/30 to-[#9A3412]/30 dark:from-[#1F2937]/20 dark:via-[#7C2D12]/20 dark:to-[#9A3412]/20 p-8 rounded-2xl my-12 backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#1F2937] to-[#FB923C]">Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: project.id * 0.2 }}
                className="card bg-[#F8FAFC]/10 dark:bg-[#1E293B]/60 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 border border-[#7C2D12]/30 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#FB923C]">{project.title}</h3>
                  <p className="text-[#1E293B] dark:text-[#F8FAFC] mb-6 leading-relaxed">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/80 text-[#1E293B] dark:text-[#FB923C] rounded-full text-sm font-medium border border-[#FB923C]/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                    className="px-6 py-2 bg-gradient-to-r from-[#1F2937] to-[#FB923C] text-white rounded-full font-semibold hover:opacity-90 transition-all duration-300"
                  >
                    {selectedProject === project.id ? 'Hide Details' : 'Show Details'}
                  </motion.button>
                  
                  <AnimatePresence>
                    {selectedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 overflow-hidden"
                      >
                        <div className="border-t border-[#7C2D12]/30 pt-6">
                          <p className="text-[#1E293B] dark:text-[#F8FAFC] mb-6 leading-relaxed">{project.longDesc}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="section fade-in bg-gradient-to-r from-[#F97316]/30 via-[#FBBF24]/30 to-[#EC4899]/30 dark:from-[#F97316]/20 dark:via-[#FBBF24]/20 dark:to-[#EC4899]/20 p-8 rounded-2xl my-12 backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#EC4899]">Contact</h2>
          <div className="text-center">
            <p className="text-[#F8FAFC] mb-8">
              Let's connect and discuss how we can work together!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <a href="mailto:er.sameeksha804@gmail.com" className="flex items-center justify-center gap-3 p-4 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/60 backdrop-blur-sm rounded-xl border border-[#F97316]/30 hover:bg-[#F97316]/20 transition-all duration-300">
                <svg className="w-6 h-6 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[#1E293B] dark:text-[#F8FAFC]">er.sameeksha804@gmail.com</span>
              </a>
              <a href="tel:+919110043701" className="flex items-center justify-center gap-3 p-4 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/60 backdrop-blur-sm rounded-xl border border-[#EC4899]/30 hover:bg-[#EC4899]/20 transition-all duration-300">
                <svg className="w-6 h-6 text-[#EC4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-[#1E293B] dark:text-[#F8FAFC]">+91 91100 43701</span>
              </a>
              <a href="https://www.linkedin.com/in/sameekshashrivastava" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/60 backdrop-blur-sm rounded-xl border border-[#F97316]/30 hover:bg-[#F97316]/20 transition-all duration-300">
                <svg className="w-6 h-6 text-[#F97316]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="text-[#1E293B] dark:text-[#F8FAFC]">LinkedIn Profile</span>
              </a>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-[#F8FAFC]/10 dark:bg-[#1E293B]/60 backdrop-blur-sm rounded-2xl p-8 border border-[#F97316]/30">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1E293B] dark:text-[#F8FAFC] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/80 border border-[#F97316]/30 rounded-lg text-[#1E293B] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1E293B] dark:text-[#F8FAFC] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/80 border border-[#F97316]/30 rounded-lg text-[#1E293B] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#1E293B] dark:text-[#F8FAFC] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/80 border border-[#F97316]/30 rounded-lg text-[#1E293B] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all duration-300"
                    placeholder="+91 ... ... ..."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1E293B] dark:text-[#F8FAFC] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-[#F8FAFC]/10 dark:bg-[#1E293B]/80 border border-[#F97316]/30 rounded-lg text-[#1E293B] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full px-8 py-3 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>

                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[#F97316] text-center"
                    >
                      Message sent successfully!
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[#EF4444] text-center"
                    >
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto py-8 text-center text-[#94A3B8]">
        <p>© 2024 Sameeksha Shrivastava. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
