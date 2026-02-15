'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface ProfileData {
  heroImage?: string;
  name?: string;
  title?: string;
  description?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function Hero() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${apiUrl}/profile`);
        console.log('PROFILE:', response.data);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">

      {/* Background Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 1.1, 1], x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 0.9, 1], x: [0, 30, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* LEFT COLUMN */}
          <motion.div className="flex flex-col justify-center lg:col-span-2">

            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-gray-400 text-lg tracking-widest uppercase">
                WELCOME TO MY PORTFOLIO
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              >
                Yasith Yuran
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-6"
            >
              Full Stack Developer & Designer
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg mb-8"
            >
              Passionate about building visually compelling and high-performing digital experiences. I combine clean code with thoughtful design to create modern, user-friendly websites and applications. From frontend development to backend systems and graphic design, I enjoy turning ideas into impactful digital solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                View My Work
                <ArrowRight size={20} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-white hover:bg-gray-900 transition"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN (ALWAYS RENDERS) */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center items-center lg:col-span-3"
          >

            {profile && profile.heroImage ? (
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-full"
              >
                <img
                  src={profile.heroImage}
                  alt="Hero"
                  className="
                           w-full
                           max-w-[1200px]
                           object-contain
                            "

                />
              </motion.div>
            ) : (
              <div className="text-gray-600 text-center">
                Loading image...
              </div>
            )}
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-sm">
            Scroll to explore
          </span>
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>

    </section>
  );
}