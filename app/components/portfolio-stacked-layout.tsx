'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import OptimizedImage from './optimized-image';
import OptimizedVideo from './optimized-video';
import { PortfolioDetail as PortfolioDetailType, PortfolioNavigation, PortfolioMedia, PortfolioImage, PortfolioVideo } from '../types/portfolio';
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

// Helper function to check if media is a video
const isVideo = (media: PortfolioMedia): media is PortfolioVideo => {
  return media.src.endsWith('.mp4') || media.src.endsWith('.webm') || media.src.endsWith('.mov');
};

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
          {(() => {
            const mediaItems = piece.images || [];
            const processedItems: React.ReactElement[] = [];
            let currentIndex = 0;

            while (currentIndex < mediaItems.length) {
              const currentMedia = mediaItems[currentIndex];
              const isCurrentVideo = isVideo(currentMedia);
              
              if (isCurrentVideo) {
                // Find all consecutive videos
                const videoGroup: typeof mediaItems = [];
                let videoIndex = currentIndex;
                
                while (videoIndex < mediaItems.length && isVideo(mediaItems[videoIndex])) {
                  videoGroup.push(mediaItems[videoIndex]);
                  videoIndex++;
                }
                
                // Render video group
                if (videoGroup.length === 1) {
                  // Single video - full width
                  processedItems.push(
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: currentIndex * 0.1 }}
                      className="w-full"
                    >
                      <OptimizedVideo
                        src={videoGroup[0].src}
                        alt={videoGroup[0].alt || `${piece.title} - Video ${currentIndex + 1}`}
                        width={videoGroup[0].width || 1200}
                        height={videoGroup[0].height || 800}
                        caption={videoGroup[0].caption}
                        poster={(videoGroup[0] as PortfolioVideo).poster}
                        autoplay={(videoGroup[0] as PortfolioVideo).autoplay}
                        loop={(videoGroup[0] as PortfolioVideo).loop}
                        muted={(videoGroup[0] as PortfolioVideo).muted}
                        priority={currentIndex < 3}
                      />
                    </motion.div>
                  );
                } else {
                  // Multiple videos - 50% width grid
                  processedItems.push(
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: currentIndex * 0.1 }}
                      className="w-full"
                    >
                      <div className="flex flex-wrap gap-4">
                        {videoGroup.map((video, videoGroupIndex) => (
                          <div key={videoGroupIndex} className="w-full md:w-[calc(50%-0.5rem)]">
                            <OptimizedVideo
                              src={video.src}
                              alt={video.alt || `${piece.title} - Video ${currentIndex + videoGroupIndex + 1}`}
                              width={video.width || 1200}
                              height={video.height || 800}
                              caption={video.caption}
                              poster={(video as PortfolioVideo).poster}
                              autoplay={(video as PortfolioVideo).autoplay}
                              loop={(video as PortfolioVideo).loop}
                              muted={(video as PortfolioVideo).muted}
                              priority={currentIndex < 3}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                }
                
                currentIndex = videoIndex;
              } else {
                // Regular image - full width
                processedItems.push(
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: currentIndex * 0.1 }}
                    className="w-full"
                  >
                    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
                      <OptimizedImage
                        src={currentMedia.src}
                        alt={currentMedia.alt || `${piece.title} - Image ${currentIndex + 1}`}
                        width={currentMedia.width || 1200}
                        height={currentMedia.height || 800}
                        className="w-full h-auto object-cover"
                        priority={currentIndex < 3}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                        quality={100}
                      />
                      {currentMedia.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                          <p className="text-sm font-medium">{currentMedia.caption}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
                currentIndex++;
              }
            }
            
            return processedItems;
          })()}
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
