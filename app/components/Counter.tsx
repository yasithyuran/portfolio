'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  label?: string;
}

export default function Counter({ end, duration = 2, label = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) return;

    hasStarted.current = true;
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);

      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-blue-400 mb-2">{count.toLocaleString()}+</div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}