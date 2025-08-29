'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import OptimizedImage from './optimized-image';
import { PortfolioDetail as PortfolioDetailType, PortfolioNavigation } from '../types/portfolio';
import Navigation from './navigation';
import Breadcrumbs from './breadcrumbs';
import PasswordProtection from './password-protection';
import { hasAccess, isPieceProtected } from '../lib/auth';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import Logo from './logo';
import ImageModal from './image-modal';
import Footer from './footer';

interface PortfolioDetailProps {
  piece: PortfolioDetailType;
  navigation: PortfolioNavigation | null;
}

export default function PortfolioDetail({ piece, navigation }: PortfolioDetailProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      if (isPieceProtected(piece.slug)) {
        setIsAuthenticated(hasAccess(piece.slug));
      } else {
        setIsAuthenticated(true);
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [piece.slug]);

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Handle image click to open modal
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!navigation) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        if (navigation.previous) {
          event.preventDefault();
          window.location.href = `/portfolio/${navigation.previous.slug}`;
        }
        break;
      case 'ArrowRight':
        if (navigation.next) {
          event.preventDefault();
          window.location.href = `/portfolio/${navigation.next.slug}`;
        }
        break;
      case 'Home':
        event.preventDefault();
        window.location.href = '/';
        break;
      case 'Escape':
        event.preventDefault();
        window.location.href = '/';
        break;
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigation]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen bg-background">
        <Logo />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Checking access...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show password protection if piece is protected and user is not authenticated
  if (isPieceProtected(piece.slug) && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Logo />
        <PasswordProtection
          pieceSlug={piece.slug}
          onSuccess={handleAuthSuccess}
          title={`${piece.title} - Protected Content`}
          description={`This portfolio piece is password protected for client confidentiality. Please enter the password to view the complete case study.`}
          errorMessage="Incorrect password. Please try again."
        />
      </div>
    );
  }

  // Show portfolio content if authenticated or not protected
  return (
    <div className="min-h-screen bg-background">
      {/* Logo */}
      <Logo />
      
      {/* Header */}
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[800px] mx-auto px-6 py-16 pb-0"
      >
        {/* Breadcrumbs */}
        <motion.div variants={itemVariants} className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Portfolio', href: '/' },
              { label: piece.title, isCurrent: true }
            ]}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium uppercase tracking-wide">
              {piece.category.replace('-', ' ')}
            </span>
            {piece.isProtected && (
              <>
                <span>•</span>
                <span className="text-accent-foreground">🔒 Protected</span>
              </>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            {piece.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {piece.description}
          </p>

          {/* Project Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-border">
            {piece.duration && (
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Duration
                </div>
                <div className="font-medium">{piece.duration}</div>
              </div>
            )}
            {piece.teamSize && (
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Team Size
                </div>
                <div className="font-medium">{piece.teamSize} people</div>
              </div>
            )}
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Role
              </div>
              <div className="font-medium">{piece.role}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Category
              </div>
              <div className="font-medium capitalize">{piece.category.replace('-', ' ')}</div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Problem Space */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[800px] mx-auto px-6 py-12 border-t border-border"
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Problem Space
          </motion.h2>
          <motion.div 
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: piece.problemSpace }}
          />
        </motion.div>
      </motion.section>

      {/* Process */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[800px] mx-auto px-6 py-12 border-t border-border"
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Design Outcome
          </motion.h2>
          <motion.div 
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: piece.process }}
          />
        </motion.div>

        {/* Technologies */}
        {piece.technologies && piece.technologies.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.h3 
              className="text-lg font-semibold text-foreground mb-3"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Methodolgies & Tools Used
            </motion.h3>
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {piece.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.section>

      {/* Images */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full py-12 border-border"
      >
        {/* Header contained within 800px */}
        <div className="max-w-[800px] mx-auto px-6 mb-8">
          <motion.h2 
            className="text-2xl font-bold text-foreground"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Project Gallery
          </motion.h2>
        </div>
        
        {/* Gallery content at 80% viewport width */}
        <div className="w-4/5 mx-auto">
          {/* Horizontal Scrolling Gallery for Multiple Images */}
          {piece.images.length > 2 ? (
            <div className="relative group w-full">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
              {piece.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-full max-w-md space-y-3 snap-start"
                >
                  <div 
                    className="relative overflow-hidden rounded-lg border border-border cursor-pointer hover:scale-105 transition-all duration-300 ease-out"
                    onClick={() => handleImageClick(index)}
                  >
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full h-auto object-cover"
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                      quality={100}
                      showCaption={!!image.caption}
                      caption={image.caption}
                    />
                  </div>

                </motion.div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground">
                ← Scroll to view, click to enlarge →
              </p>
            </div>
          </div>
        ) : (
          /* Vertical Stack for Fewer Images */
          <div className="space-y-8">
            {piece.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div 
                  className="relative overflow-hidden rounded-lg border border-border cursor-pointer hover:scale-105 transition-all duration-300 ease-out"
                  onClick={() => handleImageClick(index)}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto object-cover"
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                    quality={100}
                    showCaption={!!image.caption}
                    caption={image.caption}
                  />
                </div>

              </motion.div>
            ))}
          </div>
        )}
        </div>
      </motion.section>

      {/* Results */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[800px] mx-auto px-6 py-12 border-t border-border"
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Results & Impact
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {piece.results.impact}
          </motion.p>

          {/* Metrics */}
          {piece.results.metrics && piece.results.metrics.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-foreground mb-3"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Key Metrics
              </motion.h3>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {piece.results.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-muted rounded-lg border border-border relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "var(--accent)" }}
                  >
                    {/* Text in top left */}
                    <p className="text-sm text-muted-foreground absolute top-4 left-4 uppercase tracking-wide">
                      {metric.text}
                    </p>
                    
                    {/* Large number below */}
                    <div className="mt-8 text-center">
                      <span className="text-4xl font-light">
                        {metric.number}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.h3 
              className="text-lg font-semibold text-foreground mb-3"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              Key Outcomes
            </motion.h3>
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {piece.results.outcomes.map((outcome, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <motion.span 
                    className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                  />
                  <span className="text-muted-foreground">{outcome}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Tags */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[800px] mx-auto px-6 py-12 border-t border-border"
      >
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {piece.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* Logout Button for Protected Pieces */}
      {isPieceProtected(piece.slug) && isAuthenticated && (
        <motion.section
          variants={itemVariants}
          className="w-full max-w-[800px] mx-auto px-6 py-8 border-t border-border"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              You are currently viewing protected content.
            </p>
            <button
              onClick={() => {
                // Clear session and redirect to home
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('portfolio_auth_pieces');
                  localStorage.removeItem('portfolio_auth_attempts');
                  localStorage.removeItem('portfolio_auth_lockout');
                  window.location.href = '/';
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm"
            >
              <LockClosedIcon className="w-4 h-4" />
              Logout & Return to Portfolio
            </button>
          </div>
        </motion.section>
      )}

      {/* Navigation */}
      {navigation && (
        <Navigation
          currentPiece={navigation.current}
          previousPiece={navigation.previous}
          nextPiece={navigation.next}
          showHome={true}
        />
      )}

      {/* Image Modal */}
      <ImageModal
        images={piece.images}
        initialIndex={selectedImageIndex}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />

      {/* Footer */}
      <Footer />

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
