'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Counter({ end, duration = 2, label }) {
  const countRef = useRef(0);
  const nodeRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false, // CHANGED: Allow re-triggering
  });

  useEffect(() => {
    if (!inView) return;

    const targetNumber = parseInt(end);
    countRef.current = 0; // ADDED: Reset counter on update
    const increment = targetNumber / (duration * 60); // 60 frames per second

    const updateCount = () => {
      countRef.current += increment;

      if (countRef.current >= targetNumber) {
        countRef.current = targetNumber;
        if (nodeRef.current) {
          nodeRef.current.textContent = targetNumber + (typeof end === 'string' && end.includes('+') ? '+' : '');
        }
      } else {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.floor(countRef.current) + (typeof end === 'string' && end.includes('+') ? '+' : '');
        }
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h3
        ref={nodeRef}
        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2"
      >
        0
      </h3>
      <p className="text-gray-400 text-lg">{label}</p>
    </motion.div>
  );
}