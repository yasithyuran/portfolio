'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* LEFT - Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Yasith Yuran Logo"
            width={200}
            height={200}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* DESKTOP - Links (hidden on mobile) */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-400 hover:text-white transition duration-300">
            Home
          </Link>
          <Link href="/projects" className="text-gray-400 hover:text-white transition duration-300">
            Projects
          </Link>
          <Link href="/blog" className="text-gray-400 hover:text-white transition duration-300">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">
            Contact
          </Link>
        </div>

        {/* MOBILE - Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-white transition flex-shrink-0"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE - Menu Items (shown when open) */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-3">
          <Link 
            href="/" 
            className="block text-gray-400 hover:text-white transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/projects" 
            className="block text-gray-400 hover:text-white transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link 
            href="/blog" 
            className="block text-gray-400 hover:text-white transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            className="block text-gray-400 hover:text-white transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}