'use client';

import { motion } from 'framer-motion';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated background - full width */}
      <div className="absolute inset-0 -z-10 w-screen">
        <div className="absolute inset-0 w-full bg-gradient-to-br from-indigo-100/30 via-purple-100/30 to-pink-100/30 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10">
          <div className="absolute inset-0 w-full bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] dark:[mask-image:linear-gradient(to_bottom,transparent,rgba(0,0,0,0.9),transparent)]" />
        </div>
        <div className="absolute inset-0 w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-white dark:to-gray-900" />
      </div>

      {/* Content container with max width */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6 pb-1.5">
            Dhana Nugraha
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-8">
            Full Stack Developer | Chemical Engineer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Bridging the gap between chemical engineering and software development to build efficient, sustainable solutions. 
            Passionate about clean code, test-driven development, and creating impactful applications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 font-medium rounded-lg shadow hover:shadow-lg dark:shadow-md transition-all duration-300"
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center">
            <a href="#about" className="group">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll down</span>
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                >
                  <ArrowDownCircleIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                </motion.div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
