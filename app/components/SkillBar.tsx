'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SkillBarProps {
  skill: string;
  percentage: number;
}

export default function SkillBar({ skill, percentage }: SkillBarProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      {/* Skill name and percentage */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-300 font-semibold">{skill}</span>
        <motion.span
          className="text-blue-400 font-bold"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {inView ? percentage : 0}%
        </motion.span>
      </div>

      {/* Skill bar background */}
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        {/* Animated fill */}
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ width: '0%' }}
          animate={inView ? { width: `${percentage}%` } : { width: '0%' }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: 'easeOut',
          }}
        />
      </div>

      {/* Optional: Glow effect */}
      <motion.div
        className="w-full bg-blue-500/20 rounded-full h-3 -mt-3 blur-sm"
        initial={{ width: '0%', opacity: 0 }}
        animate={inView ? { width: `${percentage}%`, opacity: 1 } : { width: '0%', opacity: 0 }}
        transition={{
          duration: 1.5,
          delay: 0.2,
          ease: 'easeOut',
        }}
      />
    </motion.div>
  );
}