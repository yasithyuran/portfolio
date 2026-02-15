'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Default social URLs - Update these with your real URLs
  const socialLinks = {
    github: 'https://github.com/yasithyuran',
    linkedin: 'https://linkedin.com/in/yasithyuran',
    instagram: 'https://instagram.com/yasithyuran',
    email: 'mailto:your-email@example.com',
  };

  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Yasith Yuran</h3>
            <p className="text-gray-400 text-sm">
              Full Stack Developer & Designer. Building beautiful and functional web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                title="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                title="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                title="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href={socialLinks.email}
                className="text-gray-400 hover:text-white transition"
                title="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Yasith Yuran. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}