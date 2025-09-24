'use client';

import { motion } from 'framer-motion';
import { CodeBracketIcon, ServerIcon, CircleStackIcon, CloudIcon, CpuChipIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

type SkillCategory = {
  name: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    level: number;
    icon?: React.ReactNode;
  }[];
};

const techStack: SkillCategory[] = [
  {
    name: 'Languages',
    icon: <CodeBracketIcon className="h-6 w-6" />,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'Bash/Shell', level: 70 },
    ],
  },
  {
    name: 'Backend',
    icon: <ServerIcon className="h-6 w-6" />,
    skills: [
      { name: 'FastAPI', level: 90 },
      { name: 'Flask', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'Django', level: 70 },
    ],
  },
  {
    name: 'Databases',
    icon: <CircleStackIcon className="h-6 w-6" />,
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'MySQL', level: 70 },
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: <CloudIcon className="h-6 w-6" />,
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 75 },
      { name: 'Kubernetes', level: 65 },
      { name: 'CI/CD', level: 80 },
    ],
  },
  {
    name: 'Frontend',
    icon: <CpuChipIcon className="h-6 w-6" />,
    skills: [
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Redux', level: 70 },
    ],
  },
  {
    name: 'Tools',
    icon: <WrenchScrewdriverIcon className="h-6 w-6" />,
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'Postman', level: 85 },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Stack
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Technologies and tools I use to build amazing applications and solve complex problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                    {category.icon}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200/80 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.05 + skillIndex * 0.05 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Icons Grid */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-8">
            Technologies I Work With
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {[
              'Python', 'JavaScript', 'TypeScript', 'Node.js', 'React', 'Next.js', 'FastAPI', 'Flask',
              'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Git', 'Linux',
              'Tailwind CSS', 'GraphQL', 'REST', 'WebSocket', 'Jest', 'Pytest', 'Nginx', 'GitHub'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="h-12 w-12 flex items-center justify-center text-2xl mb-2">
                  {getTechIcon(tech)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function getTechIcon(tech: string) {
  const techIcons: { [key: string]: string } = {
    'Python': '🐍',
    'JavaScript': 'JS',
    'TypeScript': 'TS',
    'Node.js': 'Node',
    'React': '⚛️',
    'Next.js': 'Next',
    'FastAPI': 'FastAPI',
    'Flask': 'Flask',
    'PostgreSQL': 'PostgreSQL',
    'MongoDB': 'MongoDB',
    'Redis': 'Redis',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'AWS': '☁️',
    'Git': 'Git',
    'Linux': '🐧',
    'Tailwind CSS': 'Tailwind',
    'GraphQL': 'GraphQL',
    'REST': 'REST',
    'WebSocket': 'WS',
    'Jest': 'Jest',
    'Pytest': 'pytest',
    'Nginx': 'Nginx',
    'GitHub': 'GitHub'
  };

  return techIcons[tech] || tech.charAt(0);
}
