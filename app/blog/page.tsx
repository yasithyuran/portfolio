'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, ArrowRight, Loader, Search } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  tags?: string[];
  author?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readingTime = Math.ceil(post.content?.split(' ').length / 200) || 5;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ translateY: -5 }}
      className="bg-black rounded-lg border border-gray-800 hover:border-blue-500 transition overflow-hidden h-full flex flex-col cursor-pointer"
    >
      {/* Featured Image - LARGER */}
      <motion.div
        className="w-full h-72 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-600 text-center">
            <p className="text-sm">Featured Image</p>
            <p className="text-xs text-gray-700">Coming soon</p>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-3">
          {post.tags && post.tags.length > 0 ? (
            post.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded border border-blue-800">
                {tag}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-600">No tags</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {post.title || 'Blog Post Title'}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Excerpt - LARGER */}
        <p className="text-gray-400 text-sm mb-8 line-clamp-4 flex-grow">
          {post.excerpt || post.content?.substring(0, 150) || 'Post content will appear here'}
        </p>

        {/* Read More Link - BIGGER & MORE PROMINENT */}
        <motion.div
          whileHover={{ x: 5 }}
          className="mt-auto"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-800 rounded-lg font-semibold text-sm transition"
          >
            Read Article
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch blog posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Make sure backend is running.');
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by search query
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

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
            Blog & Articles
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Thoughts, stories, and ideas about web development, design, and technology.
          </motion.p>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-900 py-16 px-6 border-b border-gray-800">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Search className="absolute left-4 top-4 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search articles by title, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
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
              <p className="text-gray-500 text-sm">No articles yet. Check back soon!</p>
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-400 mb-4">No articles found matching your search.</p>
              <p className="text-gray-500 text-sm">Try searching with different keywords.</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredPosts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}