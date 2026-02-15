'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Counter from './components/Counter';
import SkillBar from './components/SkillBar';
import FeaturedProjects from './components/FeaturedProjects';
import { Code, Palette, Smartphone, Globe, ArrowRight, Zap, Lightbulb, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

// Reusable component for animated sections
function AnimatedSection({ children, className = '' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated skill card component with more motion
function SkillCard({ icon: Icon, title, description, index, color }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: 20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.08, translateY: -15, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
      className="bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-lg border border-gray-800 hover:border-blue-500 transition cursor-pointer"
    >
      <motion.div
        whileHover={{ rotate: 20, scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon size={40} className={`${color} mb-4`} />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

// Floating card component
function FloatingCard({ icon: Icon, title, value }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700"
    >
      <Icon className="text-blue-400 mb-2" size={24} />
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-white font-bold text-lg">{value}</p>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  // Fetch profile data
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile with all data including techStack
        const profileRes = await axios.get('https://portfolio-api-55m6.onrender.com/api/profile');
        setProfile(profileRes.data);
        
        // Get techStack from API response
        if (profileRes.data.techStack && profileRes.data.techStack.length > 0) {
          setSkills(profileRes.data.techStack);
          console.log('✅ Tech stack from API:', profileRes.data.techStack);
        } else {
          setSkills([]);
          console.log('❌ No tech stack in API response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Refresh data every 3 seconds
    const interval = setInterval(fetchData, 3000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      {/* Skills/Services Section */}
      <section className="bg-black py-20 px-6 relative overflow-hidden">
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              What I Do
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            
            <SkillCard
              icon={Palette}
              title="UI/UX Design"
              description="Creating beautiful and intuitive user interfaces with Figma and modern design tools"
              index={1}
              color="text-purple-400"
            />
            <SkillCard
              icon={Smartphone}
              title="Graphic Design"
              description="Designing logos, branding, and visual assets that stand out"
              index={2}
              color="text-pink-400"
            />
            <SkillCard
              icon={Globe}
              title="Full Stack Developments"
              description="End-to-end solutions from frontend to backend and database design"
              index={3}
              color="text-green-400"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-gray-900 py-20 px-6 relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection className="text-center mb-16">
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Here are some of my recent projects. Check out my full portfolio to see more.
            </p>
          </AnimatedSection>

          {/* Featured Projects Component - Shows dynamic projects from database */}
          <div className="mb-12">
            <FeaturedProjects />
          </div>

          {/* View All Button */}
          <AnimatedSection className="text-center">
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition cursor-pointer"
            >
              View All Projects
              <ArrowRight size={20} />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      {/* Statistics Section with Counter Animation */}
      <section className="bg-black py-20 px-6 relative overflow-hidden" ref={containerRef}>
        <motion.div
          className="absolute top-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl -z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              My Achievements
            </motion.h2>
            <p className="text-gray-400">
              Some numbers that speak for themselves
            </p>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ opacity, scale }}
          >
            <Counter 
              end={profile?.achievements?.projectsCompleted || 0} 
              duration={2.5} 
              label="Projects Completed" 
            />
            <Counter 
              end={profile?.achievements?.happyClients || 0} 
              duration={2.5} 
              label="Happy Clients" 
            />
            <Counter 
              end={profile?.achievements?.yearsExperience || 0} 
              duration={2.5} 
              label="Years Experience" 
            />
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section with Skill Bars */}
      <section className="bg-gray-900 py-20 px-6 relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Tech Stack 
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies I work with and my rough proficiency level in each
            </p>
          </AnimatedSection>

          {/* Skill Bars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skills && skills.length > 0 ? (
              skills.map((item, index) => (
                <motion.div
                  key={`${item.skill}-${index}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <SkillBar
                    skill={item.skill}
                    percentage={item.percentage}
                  />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 col-span-2 text-center py-8">
                No skills added yet. Add them in Admin → Profile & Tech Stack.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-20 px-6 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -z-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Work With Me
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingCard
              icon={Rocket}
              title="Fast Delivery"
              value="Quick Turnaround"
            />
            <FloatingCard
              icon={Lightbulb}
              title="Creative Solutions"
              value="Custom Design"
            />
            <FloatingCard
              icon={Zap}
              title="Performance"
              value="Optimized Speed"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 -z-10"
          animate={{ backgroundPosition: ['0% center', '100% center'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection className="mb-8">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Let's Work Together
            </motion.h2>
            <p className="text-gray-400 text-lg">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition transform cursor-pointer"
            >
              Start a Conversation
              <ArrowRight size={20} />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
}