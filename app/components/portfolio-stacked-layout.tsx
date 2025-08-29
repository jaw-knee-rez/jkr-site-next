'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import OptimizedImage from './optimized-image';
import { PortfolioDetail as PortfolioDetailType, PortfolioNavigation } from '../types/portfolio';
import Navigation from './navigation';
import Breadcrumbs from './breadcrumbs';
import PasswordProtection from './password-protection';
import { hasAccess, isPieceProtected } from '../lib/auth';
import Logo from './logo';
import Footer from './footer';

interface PortfolioStackedLayoutProps {
  piece: PortfolioDetailType;
  navigation: PortfolioNavigation | null;
}

export default function PortfolioStackedLayout({ piece, navigation }: PortfolioStackedLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

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
      <Logo />
      
      {/* Header */}
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[800px] mx-auto px-6 py-16"
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
            <span>•</span>
            <span>{new Date(piece.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long',
              day: 'numeric'
            })}</span>
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

      {/* Stacked Images Layout */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1200px] mx-auto px-6 pb-16"
      >
        <div className="space-y-8">
          {piece.images?.map((image, index) => (
                          <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full"
              >
                <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt || `${piece.title} - Image ${index + 1}`}
                    width={image.width || 1200}
                    height={image.height || 800}
                    className="w-full h-auto object-cover"
                    priority={index < 3} // Prioritize first 3 images
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                    quality={100}
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                      <p className="text-sm font-medium">{image.caption}</p>
                    </div>
                  )}
                </div>
              </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Navigation */}
        {navigation && (
          <Navigation
            currentPiece={navigation.current}
            previousPiece={navigation.previous}
            nextPiece={navigation.next}
            showHome={true}
          />
        )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
