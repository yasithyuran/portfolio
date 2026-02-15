'use client';

import Link from 'next/link';
import { Monitor } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* LEFT - Icon and Name */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <Monitor size={28} className="text-white" />
          <span className="text-xl font-bold text-white">Yasith Yuran</span>
        </Link>

        {/* RIGHT - Links */}
        <div className="flex gap-8">
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
      </div>
    </nav>
  );
}