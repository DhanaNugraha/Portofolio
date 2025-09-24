'use client';

import { motion } from 'framer-motion';
import { CodeBracketIcon, ServerIcon, CircleStackIcon, CloudIcon, CpuChipIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

type SkillLevel = 'Expert' | 'Advanced' | 'Proficient' | 'Intermediate' | 'Beginner';

type Skill = {
  name: string;
  level: SkillLevel;
  icon?: React.ReactNode;
};

type SkillCategory = {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const techStack: SkillCategory[] = [
  {
    name: 'Languages',
    icon: <CodeBracketIcon className="h-6 w-6" />,
    skills: [
      { name: 'Python', level: 'Expert' },
      { name: 'JavaScript/TypeScript', level: 'Proficient' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'Bash/Shell', level: 'Intermediate' },
    ],
  },
  {
    name: 'Backend',
    icon: <ServerIcon className="h-6 w-6" />,
    skills: [
      { name: 'Flask', level: 'Expert' },
      { name: 'FastAPI', level: 'Advanced' },
      { name: 'RESTful APIs', level: 'Expert' },
      { name: 'Microservices', level: 'Advanced' },
    ],
  },
  {
    name: 'Databases',
    icon: <CircleStackIcon className="h-6 w-6" />,
    skills: [
      { name: 'PostgreSQL', level: 'Expert' },
      { name: 'SQLAlchemy', level: 'Advanced' },
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: <CloudIcon className="h-6 w-6" />,
    skills: [
      { name: 'Docker', level: 'Advanced' },
      { name: 'Docker Compose', level: 'Advanced' },
      { name: 'CI/CD', level: 'Advanced' },
    ],
  },
  {
    name: 'Frontend',
    icon: <CpuChipIcon className="h-6 w-6" />,
    skills: [
      { name: 'React', level: 'Advanced' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'TypeScript', level: 'Proficient' },
    ],
  },
  {
    name: 'Tools & Practices',
    icon: <WrenchScrewdriverIcon className="h-6 w-6" />,
    skills: [
      { name: 'Git', level: 'Expert' },
      { name: 'JWT/OAuth2', level: 'Advanced' },
      { name: 'OpenAPI/Swagger', level: 'Advanced' },
      { name: 'Postman', level: 'Advanced' },
      { name: 'VS Code', level: 'Expert' },
    ],
  },
];

const getLevelPercentage = (level: SkillLevel): number => {
  switch (level) {
    case 'Expert': return 95;
    case 'Advanced': return 85;
    case 'Proficient': return 75;
    case 'Intermediate': return 60;
    case 'Beginner': return 40;
    default: return 0;
  }
};

const getLevelColor = (level: SkillLevel): string => {
  switch (level) {
    case 'Expert': return 'bg-blue-600';
    case 'Advanced': return 'bg-green-500';
    case 'Proficient': return 'bg-yellow-500';
    case 'Intermediate': return 'bg-orange-500';
    case 'Beginner': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

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
            My Tech Stack
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Technologies I've been working with recently
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
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const percentage = getLevelPercentage(skill.level);
                  const color = getLevelColor(skill.level);
                  
                  return (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200/80 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 + skillIndex * 0.05 }}
                          className={`h-full ${color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
