'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const timeline = [
  {
    id: 1,
    type: 'work',
    title: 'Software Engineer Associate',
    institution: 'RevoU x VI Partners',
    year: '2025',
    description: 'Led development of Transaction Service microservice with Docker deployment',
  },
  {
    id: 2,
    type: 'education',
    title: 'Full Stack Software Engineering',
    institution: 'RevoU',
    year: '2024-2025',
    description: 'Project intensive program with hands on experience in full stack development using Python, Flask, PostgreSQL, and REST API design',
  },
  {
    id: 3,
    type: 'work',
    title: 'Technology and Engineering Intern',
    institution: 'Pertamina New & Renewable Energy',
    year: '2023',
    description: 'Conducted studies on sustainable energy solutions and performed technical simulations',
  },
  {
    id: 4,
    type: 'education',
    title: 'B.Sc. Chemical Engineering',
    institution: 'Bandung Institute of Technology',
    year: '2020-2024',
    description: 'Focused on process design, optimization, and industrial systems',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 shadow-inner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A determined and responsible professional with a strong adaptive mindset, transitioning into software engineering with a solid foundation in both technical and analytical problem solving from my chemical engineering background.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              My Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              With a strong foundation in chemical engineering and a passion for technology, I've transitioned into software engineering through intensive training and hands-on projects. My background in process optimization and analytical thinking gives me a unique perspective on building efficient systems.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Through my journey, I've developed expertise in Python, Flask, PostgreSQL, and containerization with Docker. I'm particularly proud of achieving 98% test coverage on a sustainable marketplace project that won 2nd place in my bootcamp.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative space-y-8">
              {timeline.map((item, index) => (
                <div key={item.id} className="relative pl-8 sm:pl-16">
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 shadow-sm">
                    {item.type === 'education' ? (
                      <AcademicCapIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                    ) : (
                      <BriefcaseIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                    )}
                  </div>
                  <div className="absolute left-3.5 top-8 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                  <div className="relative
                    before:absolute before:-left-3 before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:border-4 before:border-indigo-600 before:bg-white dark:before:bg-gray-900
                    after:absolute after:-left-3 after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-indigo-600
                  "></div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl shadow-gray-200/70 hover:shadow-gray-300/50 dark:shadow-md dark:hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-indigo-600 dark:text-indigo-400">{item.institution}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.year}</p>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
