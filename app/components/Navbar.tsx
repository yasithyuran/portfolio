'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* LEFT - Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition">
          <Image
            src="/logo.png"
            alt="Yasith Yuran Logo"
            width={200}
            height={200}
            className="h-10 w-auto"
            priority
          />
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