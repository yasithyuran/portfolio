'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Loader } from 'lucide-react';

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, translateY: -10 }}
      className="bg-black rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition h-full flex flex-col cursor-pointer"
    >
      {/* Image with Thumbnail */}
      <motion.div
        className="w-full h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden relative"
        whileHover={{ scale: 1.1 }}
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
            <p className="text-sm">Project Image</p>
            <p className="text-xs text-gray-700">Coming soon</p>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
            {project.category || 'Web App'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3">
          {project.title || 'Project Title'}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
          {project.description || 'Project description will appear here'}
        </p>

        {/* Technologies */}
        <div className="flex gap-2 flex-wrap mb-6">
          {project.technologies && project.technologies.length > 0 ? (
            project.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded border border-gray-700"
              >
                {tech}
              </motion.span>
            ))
          ) : (
            <span className="text-xs text-gray-600">No technologies added</span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveLink && (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold"
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
          {project.githubLink && (
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold"
            >
              <Github size={16} />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full font-semibold transition border ${
            selectedCategory === category
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-700'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Web App', 'Mobile', 'UI/UX', 'Graphic Design'];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Make sure backend is running.');
        setProjects([]);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-black py-20 px-6 pt-40">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            My Projects
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A collection of my recent work across web development, mobile apps, UI/UX design, and graphic design.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Projects Grid */}
          <div>
            {loading ? (
              <motion.div
                className="flex justify-center items-center py-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Loader size={48} className="text-blue-400" />
              </motion.div>
            ) : error ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-400 mb-4">{error}</p>
                <p className="text-gray-500 text-sm">No projects yet. Add projects through the admin dashboard.</p>
              </motion.div>
            ) : filteredProjects.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-400 mb-4">No projects found in this category.</p>
                <p className="text-gray-500 text-sm">Check back soon!</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {filteredProjects.map((project, index) => (
                  <Link key={project._id} href={`/projects/${project._id}`} className="block">
                    <ProjectCard project={project} index={index} />
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}