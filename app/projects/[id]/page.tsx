'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Loader, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-api-55m6.onrender.com/api';
        const response = await axios.get(`${apiUrl}/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!allImages || allImages.length === 0) return;
      
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [project]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center py-40">
          <Loader size={48} className="text-blue-400 animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="text-center py-40">
          <p className="text-gray-400 text-lg">Project not found</p>
        </div>
        <Footer />
      </>
    );
  }

  // Combine thumbnail and gallery images
  const allImages = [];
  if (project.thumbnail) {
    allImages.push(project.thumbnail);
  }
  if (project.images && project.images.length > 0) {
    allImages.push(...project.images);
  }

  const displayImage = allImages.length > 0 ? allImages[selectedImageIndex] : null;

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Navbar />

      <section className="bg-black py-20 px-6 pt-32">
        <div className="max-w-5xl mx-auto">
          {/* Image Slideshow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative"
          >
            {displayImage ? (
              <div className="relative group cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
                <img
                  src={displayImage}
                  alt={`${project.title} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-96 md:h-[500px] object-cover rounded-lg border border-gray-800 hover:border-blue-500 transition"
                />

                {/* Click to expand hint */}
                <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <p className="text-white text-center text-sm font-semibold bg-black/70 px-4 py-2 rounded-lg">
                      Click to expand
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    {/* Left Arrow */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevious();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition opacity-0 group-hover:opacity-100"
                      title="Previous (Arrow Left)"
                    >
                      <ChevronLeft size={32} />
                    </motion.button>

                    {/* Right Arrow */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition opacity-0 group-hover:opacity-100"
                      title="Next (Arrow Right)"
                    >
                      <ChevronRight size={32} />
                    </motion.button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {selectedImageIndex + 1} / {allImages.length}
                    </div>

                    {/* Keyboard hint */}
                    <div className="absolute top-4 left-4 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-800">
                      Use ← → keys or click arrows to navigate
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-800 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </motion.div>

          {/* Gallery Thumbnails */}
          {allImages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h3 className="text-white font-semibold mb-4">Gallery ({allImages.length} images)</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    className={`flex-shrink-0 h-24 w-32 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === idx
                        ? 'border-blue-500 ring-2 ring-blue-400'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                    title={`Image ${idx + 1}${idx === 0 && project.thumbnail ? ' (Thumbnail)' : ''}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && project.thumbnail && (
                      <div className="absolute text-xs bg-blue-500 text-white px-2 py-1">Thumbnail</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {project.title}
          </motion.h1>

          {/* Category & Featured Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex gap-3"
          >
            <span className="text-sm bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full border border-blue-800">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-sm bg-yellow-900/30 text-yellow-300 px-4 py-2 rounded-full border border-yellow-800 font-semibold flex items-center gap-1">
                ⭐ Featured
              </span>
            )}
            {project.pinned && (
              <span className="text-sm bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full border border-blue-800 font-semibold flex items-center gap-1">
                📌 Pinned
              </span>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </motion.div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-800"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12 flex flex-wrap gap-6"
          >
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                <ExternalLink size={20} />
                View Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
              >
                <Github size={20} />
                View Code
              </a>
            )}
          </motion.div>

          {/* Back Button */}
          <motion.a
            href="/projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            ← Back to Projects
          </motion.a>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && displayImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition z-10"
            title="Close (Press Esc)"
          >
            <X size={32} />
          </motion.button>

          {/* Main Image */}
          <div className="relative max-w-4xl w-full h-auto flex items-center justify-center">
            <img
              src={displayImage}
              alt={`${project.title} - Full Image`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />

            {/* Navigation Arrows in Lightbox */}
            {allImages.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
                >
                  <ChevronLeft size={40} />
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
                >
                  <ChevronRight size={40} />
                </motion.button>
              </>
            )}
          </div>

          {/* Image Counter in Lightbox */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-lg font-semibold">
              {selectedImageIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Keyboard Hint */}
          <div className="absolute bottom-6 right-6 text-white/70 text-sm text-center">
            <p>← → Arrow Keys • Esc to Close</p>
          </div>
        </motion.div>
      )}

      <Footer />
    </>
  );
}