'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBracketIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
  category: 'backend' | 'fullstack' | 'tools';
};

const projects: Project[] = [
  {
    id: 1,
    title: 'TiketQ - OTA Platform',
    description: 'A comprehensive Online Travel Agent platform with microservices architecture. Features include flight/ferry/hotel bookings, PPOB services, payment processing, and role-based access control (RBAC). Built with Python, FastAPI, and PostgreSQL.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Microservices', 'JWT', 'OAuth2', 'Swagger'],
    image: '/images/projects/TiketQ-Blue.png',

    category: 'backend',
  },
  {
    id: 2,
    title: 'WeRent - Clothing Rental Platform',
    description: 'A modern, secure, and scalable Flask-based backend API for a clothing rental platform. Features include JWT authentication, item management, booking system, and comprehensive API documentation with Swagger UI.',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'JWT', 'OpenAPI 3.0', 'PostgreSQL', 'Swagger'],
    image: '/images/projects/WeRent.png',
    demoUrl: 'https://werent-frontend.vercel.app/',
    codeUrl: 'https://github.com/DhanaNugraha/werent-backend',
    category: 'backend',
  },
  {
    id: 3,
    title: 'Rupa Rawi - Sustainable E-commerce',
    description: 'A RESTful API for connecting local communities with sustainable products. Enables eco-conscious consumers to discover and purchase from vendors offering environmentally friendly goods while supporting local economies.',
    tags: ['Python', 'Flask', 'PostgreSQL', 'JWT', 'REST API', 'ApiDog', 'pytest'],
    image: '/images/projects/ruparawi-2.png',
    demoUrl: 'https://ruparawi-frontend.vercel.app/',
    codeUrl: 'https://github.com/DhanaNugraha/ruparawi-backend',
    category: 'backend',
  },
  {
    id: 4,
    title: 'Developer Portfolio',
    description: 'This portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode and responsive design.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/projects/Portofolio.png',
    demoUrl: 'https://portofolio-alpha-pearl-97.vercel.app/',
    codeUrl: 'https://github.com/DhanaNugraha/Portofolio',
    category: 'tools',
  },
];

const categories = ['all', 'backend', 'fullstack', 'tools'] as const;
type Category = typeof categories[number];

import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const projectsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.6, // Start after categories have appeared
    },
  },
};

const projectItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 0,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Function to handle project card click
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };


  // Function to close the modal
  const closeModal = () => {
    setSelectedProject(null);
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
  };

  // Close modal when clicking outside content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of the projects I&apos;ve worked on. Each project presents unique challenges and learning opportunities.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((category: Category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              custom={index}
              initial="hidden"
              animate="show"
              variants={categoryVariants}
              transition={{
                delay: 0.1 + (index * 0.1),
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:border-indigo-700'
                  : 'bg-white dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600/80 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            minHeight: '500px', // Prevent layout shift
            transition: 'min-height 0.3s ease-out',
          }}
          variants={projectsContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence mode="sync">
            {filteredProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              layout
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 0, scale: 0.98 }}
              custom={index}
              variants={projectItemVariants}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                layout: { 
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  duration: 0.2
                }
              }}
              className="relative group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div 
                className="flex flex-col h-full bg-gray-50 dark:bg-slate-900/40 rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl hover:-translate-y-1 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer border border-gray-100 dark:border-gray-700/50 hover:border-indigo-100 dark:hover:border-indigo-900/70"
                onClick={() => handleProjectClick(project)}
              >
                {/* Project Image */}
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-900/10 dark:to-purple-900/10 overflow-hidden">
                    {/* View Details Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 text-sm font-medium rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110">
                        <span>View Project</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    
                    {project.image.endsWith('placeholder-project.svg') ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CodeBracketIcon className="h-16 w-16 text-gray-300 dark:text-gray-700" />
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain p-4"
                          onError={() => {
                            // Handle image error
                          }}
                          style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            objectFit: 'contain' as const
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-2 max-h-20 overflow-y-auto">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-100/80 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200 whitespace-nowrap hover:bg-indigo-200/80 dark:hover:bg-indigo-800/50 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-3 pt-2 mt-auto">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <EyeIcon className="h-4 w-4" />
                        Live Demo
                      </a>
                    ) : (
                      <button
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md cursor-not-allowed opacity-70"
                        disabled
                        onClick={(e) => e.stopPropagation()}
                        title="Demo not available"
                      >
                        <EyeIcon className="h-4 w-4" />
                        Demo Unavailable
                      </button>
                    )}
                    {project.codeUrl ? (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                        View Code
                      </a>
                    ) : (
                      <button
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md cursor-not-allowed opacity-70"
                        disabled
                        onClick={(e) => e.stopPropagation()}
                        title="Source code not available"
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                        Code Private
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Project Image */}
              <div className="relative w-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20" style={{ height: '45vh', minHeight: '300px' }}>
                {selectedProject.image.endsWith('placeholder-project.svg') ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <CodeBracketIcon className="h-20 w-20 text-gray-300 dark:text-gray-600" />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center p-6">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      width={800}
                      height={600}
                      className="max-w-[90%] max-h-[90%] w-auto h-auto object-scale-down"
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                      }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden fallback-placeholder absolute inset-0 items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20">
                      <CodeBracketIcon className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedProject.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {selectedProject.demoUrl ? (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EyeIcon className="h-4 w-4" />
                      View Live Demo
                    </a>
                  ) : (
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md cursor-not-allowed opacity-70"
                      disabled
                      onClick={(e) => e.stopPropagation()}
                      title="Demo not available"
                    >
                      <EyeIcon className="h-4 w-4" />
                      Demo Not Available
                    </button>
                  )}
                  {selectedProject.codeUrl ? (
                    <a
                      href={selectedProject.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CodeBracketIcon className="h-4 w-4" />
                      View Source Code
                    </a>
                  ) : (
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md cursor-not-allowed opacity-70"
                      disabled
                      onClick={(e) => e.stopPropagation()}
                      title="Source code not available"
                    >
                      <CodeBracketIcon className="h-4 w-4" />
                      Code Private
                    </button>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
