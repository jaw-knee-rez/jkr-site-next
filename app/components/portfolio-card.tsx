'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortfolioPiece } from '../types/portfolio';
import OptimizedImage from './optimized-image';

interface PortfolioCardProps {
  piece: PortfolioPiece;
  index: number;
}

export default function PortfolioCard({ piece, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -2, 0]
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex-shrink-0 w-80 h-96 bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-xl theme-toggle-transition cursor-pointer"
    >
      <Link href={`/portfolio/${piece.slug}`} className="block h-full">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="relative w-full h-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <OptimizedImage
              src={piece.thumbnail.src}
              alt={piece.thumbnail.alt}
              width={piece.thumbnail.width}
              height={piece.thumbnail.height}
              className="object-cover w-full h-full"
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Image overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          {piece.isProtected && (
            <motion.div 
              className="absolute top-3 right-3 bg-black-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white font-medium shadow-lg"
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.2 }}
            >
              🔒 Protected
            </motion.div>
          )}
          {piece.featured && (
            <motion.div 
              className="absolute top-3 left-3 bg-accent px-2 py-1 rounded-full text-xs font-medium text-accent-foreground"
              whileHover={{ scale: 1.1, rotate: -2 }}
              transition={{ duration: 0.2 }}
            >
              ⭐ Featured
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-48">
          {/* Category and Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {piece.category.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <div className="flex items-start gap-2 mb-2">
            <motion.h3 
              className="text-lg font-semibold text-card-foreground line-clamp-2 flex-1"
              whileHover={{ color: "var(--accent-foreground)" }}
              transition={{ duration: 0.2 }}
            >
              {piece.title}
            </motion.h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
            {piece.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {piece.tags.slice(0, 3).map((tag) => (
              <motion.span
                key={tag}
                className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground cursor-default"
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-foreground)"
                }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
            {piece.tags.length > 3 && (
              <motion.span 
                className="text-xs px-2 py-1 text-muted-foreground"
                whileHover={{ color: "var(--foreground)" }}
                transition={{ duration: 0.2 }}
              >
                +{piece.tags.length - 3} more
              </motion.span>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-accent/30 rounded-lg pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
}
