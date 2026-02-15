'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, Loader } from 'lucide-react';

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

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-api-55m6.onrender.com/api';
        
        console.log('📡 Fetching post from:', `${apiUrl}/blog/${slug}`);
        
        const response = await axios.get(`${apiUrl}/blog/${slug}`);
        console.log('✅ Post fetched:', response.data);
        setPost(response.data);
      } catch (error) {
        console.error('❌ Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="text-center py-40">
          <p className="text-gray-400 text-lg">Article not found</p>
          <p className="text-gray-500 text-sm mt-2">Make sure the post exists and is published</p>
        </div>
        <Footer />
      </>
    );
  }

  const publishedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readingTime = Math.ceil(post.content?.split(' ').length / 200) || 5;

  return (
    <>
      <Navbar />

      <section className="bg-black py-20 px-6 pt-32">
        <div className="max-w-3xl mx-auto">
          {/* Featured Image */}
          {post.featured_image && (
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              src={post.featured_image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg border border-gray-800 mb-12"
            />
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 mb-8 text-gray-400 border-b border-gray-800 pb-8"
          >
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{publishedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{readingTime} min read</span>
            </div>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-12"
            >
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full border border-blue-800"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert max-w-none mb-12"
          >
            <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </motion.div>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-12"
          >
            <h3 className="text-white font-semibold mb-2">About the Author</h3>
            <p className="text-gray-400">
              Written by <span className="text-white font-semibold">{post.author || 'Yasith Yuran'}</span>
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.a
            href="/blog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            ← Back to Blog
          </motion.a>
        </div>
      </section>

      <Footer />
    </>
  );
}