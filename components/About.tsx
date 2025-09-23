'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const timeline = [
  {
    id: 1,
    type: 'education',
    title: 'Computer Science Degree',
    institution: 'University of Technology',
    year: '2020',
    description: 'Specialized in Software Engineering and Distributed Systems',
  },
  {
    id: 2,
    type: 'work',
    title: 'Junior Backend Developer',
    institution: 'Tech Solutions Inc.',
    year: '2020-2021',
    description: 'Developed RESTful APIs and worked with PostgreSQL databases',
  },
  {
    id: 3,
    type: 'work',
    title: 'Backend Engineer',
    institution: 'CloudScale Systems',
    year: '2021-Present',
    description: 'Building scalable microservices with Python, FastAPI, and Docker',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
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
            I'm a passionate Backend Engineer with expertise in building scalable and reliable systems.
            I love solving complex problems and creating efficient, maintainable code.
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
              With over 3 years of experience in backend development, I've had the opportunity to work on
              various projects ranging from small startups to enterprise-level applications. I specialize in
              designing and implementing RESTful APIs, optimizing database performance, and ensuring system reliability.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              My journey in software development started with a curiosity about how things work under the hood.
              This led me to pursue a degree in Computer Science and eventually specialize in backend development.
            </p>
            <div className="pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Download Resume
              </a>
            </div>
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
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
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
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
