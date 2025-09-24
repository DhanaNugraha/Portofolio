'use client';

import { motion } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { LinkedinIcon, GithubIcon, TwitterIcon, MailIcon } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: <GithubIcon className="h-5 w-5" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: <LinkedinIcon className="h-5 w-5" />,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: <TwitterIcon className="h-5 w-5" />,
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: <MailIcon className="h-5 w-5" />,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200/80 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_-2px_4px_-1px_rgba(0,0,0,0.03)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">DN</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Full Stack Developer with a background in Chemical Engineering, passionate about building sustainable and efficient solutions through code.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:-translate-y-0.5"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#tech"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                >
                  Tech Stack
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MailIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:your.email@example.com"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                >
                  your.email@example.com
                </a>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+1234567890"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-300">
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DN. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-md hover:shadow-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              Back to top
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
