'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BioSectionProps {
  name: string;
  title: string;
  bio: string;
  avatar?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  skills?: string[];
  experience?: string;
  location?: string;
  email?: string;
  linkedin?: string;
  behance?: string;
}

export default function BioSection({
  name,
  title,
  bio,
  avatar,
  skills = [],
  experience,
  location,
  email,
  linkedin,
  behance
}: BioSectionProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-[800px] mx-auto px-6 py-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Avatar and Basic Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          {avatar && (
            <div className="mb-6">
              <Image
                src={avatar.src}
                alt={avatar.alt}
                width={avatar.width}
                height={avatar.height}
                className="rounded-2xl shadow-lg object-cover"
                priority
              />
            </div>
          )}
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              {name}
            </h1>
            <h2 className="text-xl text-muted-foreground font-medium">
              {title}
            </h2>
            
            {/* Contact Info */}
            {(email || location || experience) && (
              <div className="space-y-2 text-sm text-muted-foreground">
                {email && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    <a 
                      href={`mailto:${email}`}
                      className="hover:text-foreground transition-colors duration-200"
                    >
                      {email}
                    </a>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    {location}
                  </div>
                )}
                {experience && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    {experience}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Bio and Skills */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Bio */}
          <div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {bio.split('\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap">
              {/* Process Link */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              </motion.div>
                {linkedin && (
                  <motion.a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </motion.a>
                )}
                {behance && (
                  <motion.a
                    href={behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7V5h7v2zm1.794-1.794C22.8 4.188 21.854 4 21 4h-7v7h7c.854 0 1.8-.188 2.794-.794C23.188 9.2 24 8.146 24 7s-.812-2.2-2.206-2.794zM9 12c0-1.626-1.374-3-3-3H0v12h6c1.626 0 3-1.374 3-3V12zM6 18H2v-4h4v4zm0-6H2V8h4v4z"/>
                    </svg>
                    Behance
                  </motion.a>
                )}
              </div>
            </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
