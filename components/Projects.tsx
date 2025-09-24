'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, EyeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  codeUrl: string;
  category: 'backend' | 'fullstack' | 'tools';
};

const projects: Project[] = [
  {
    id: 1,
    title: 'RESTful E-commerce API',
    description: 'A high-performance e-commerce API built with FastAPI, PostgreSQL, and Redis. Features include JWT authentication, payment processing, and real-time inventory management.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/images/projects/ecommerce-api.jpg',
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/username/ecommerce-api',
    category: 'backend',
  },
  {
    id: 2,
    title: 'Task Management System',
    description: 'A full-stack task management application with real-time updates using WebSockets. Built with React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'JWT'],
    image: '/images/projects/task-manager.jpg',
    demoUrl: 'https://example.com/task-manager',
    codeUrl: 'https://github.com/username/task-manager',
    category: 'fullstack',
  },
  {
    id: 3,
    title: 'Image Processing Service',
    description: 'A microservice for processing and optimizing images on the fly. Built with Python, FastAPI, and OpenCV.',
    tags: ['Python', 'FastAPI', 'OpenCV', 'Docker', 'AWS S3'],
    image: '/images/projects/image-processor.jpg',
    codeUrl: 'https://github.com/username/image-processor',
    category: 'backend',
  },
  {
    id: 4,
    title: 'Developer Portfolio',
    description: 'This portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode and responsive design.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/projects/portfolio.jpg',
    demoUrl: 'https://yourportfolio.com',
    codeUrl: 'https://github.com/username/portfolio',
    category: 'tools',
  },
];

const categories = ['all', 'backend', 'fullstack', 'tools'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
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
            Here are some of the projects I've worked on. Each project presents unique challenges and learning opportunities.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="h-full bg-white dark:bg-slate-900/40 rounded-xl shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-xl">
                {/* Project Image */}
                <div className="h-48 bg-gray-200 dark:bg-gray-900/50 relative overflow-hidden border-b border-gray-100 dark:border-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CodeBracketIcon className="h-16 w-16 text-gray-300 dark:text-gray-700" />
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/70 text-indigo-800 dark:text-indigo-100 rounded-full border border-indigo-200 dark:border-indigo-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-700 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                      >
                        <EyeIcon className="h-4 w-4" />
                        Demo
                      </a>
                    )}
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <CodeBracketIcon className="h-4 w-4" />
                      Code
                    </a>
                  </div>
                </div>

                {/* Hover Overlay */}
                {hoveredProject === project.id && (
                  <motion.div 
                    className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  >
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <EyeIcon className="h-5 w-5" />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      <CodeBracketIcon className="h-5 w-5" />
                      View Code
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
