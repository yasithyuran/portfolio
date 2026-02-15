'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  technologies?: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 20 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, translateY: -10, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)' }}
      className="bg-black rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition"
    >
      {/* Project Image */}
      <motion.div
        className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden relative"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.5 }}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-600 text-center">
            <p>No image</p>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex gap-2 flex-wrap mb-4">
          {project.technologies && project.technologies.slice(0, 2).map((tech, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded cursor-pointer border border-blue-800"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies && project.technologies.length > 2 && (
            <span className="text-xs text-gray-400">+{project.technologies.length - 2}</span>
          )}
        </div>

        {/* View Project Link */}
        <Link href={`/projects/${project._id}`}>
          <motion.div
            whileHover={{ x: 8, color: '#60a5fa' }}
            className="text-blue-400 hover:text-blue-300 transition text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            View Project
            <ArrowRight size={16} />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://https://portfolio-api-55m6.onrender.com/api/api';
        const response = await axios.get(`${apiUrl}/projects/featured`);
        setProjects(response.data);
        console.log('✅ Featured projects loaded:', response.data);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-400">Loading featured projects...</div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No featured projects yet. Mark some projects as featured in the admin dashboard!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}
    </div>
  );
}