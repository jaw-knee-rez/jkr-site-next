'use client';

import BioSection from './components/bio-section';
import PortfolioGallery from './components/portfolio-gallery';
import Footer from './components/footer';
import Logo from './components/logo';
import { getPublicPortfolio, getFeaturedPortfolio } from './lib/portfolio-data';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ThemeToggle = dynamic(() => import('./components/theme-toggle'), {
  ssr: false,
  loading: () => <div className="fixed top-6 right-6 z-50 w-14 h-14" />
});

export default function Home() {
  const publicPortfolio = getPublicPortfolio();
  const featuredPortfolio = getFeaturedPortfolio();

  return (
    <div className="min-h-screen bg-background">
      {/* Logo */}
      <Logo />
      
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* All Portfolio */}
      <PortfolioGallery
        pieces={publicPortfolio}
        title="Hi, I'm Resman - designer & tinkerer"
        subtitle='Selected works'
      />

      {/* Bio Section */}
      <BioSection
        name="About"
        title=""
        bio={`I'm a Product Designer & Manager with 15+ years of experience shaping digital products. I specialize in a hands-on approach of leading teams to deliver exceptional experiences through Visual Design, Interaction Design, Information Architecture, Design Systems, and HCI Design.

I've led design for major initiatives like Sprint Telecoms' digital overhaul, the Immutable brand and game UX for Gods Unchained, the Atlassian Forge Developer Platform, Jira Work Management's journey from startup to scale-up, and Pfizer Connect's digital ecosystem.

I value craftsmanship, content, and curiosity; guided by a “measure twice, cut once” philosophy. I'm passionate about mentoring designers, building relationships, and driving design that makes a difference.`}
        skills={[
          'Visual Deign',
          'UX/UI Design',
          'Design Systems',
          'Prototyping',
          'User Research',
          'User Testing',
          'Information Architecture',
          'Interaction Design',
          'Design Strategy',
          'Design leadership',
          'People management',
          'Figma',
          'Cursor',
          'Protopie'
        ]}
        experience="15+ years"
        location="Sydney, Australia"
        email="resman.jk@gmail.com"
        linkedin="https://linkedin.com/in/jkresman"
      />

      {/* Design Process Link */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[800px] mx-auto px-6 py-16 text-center"
      >
        <div className="border-t border-border pt-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl font-bold text-foreground mb-4"
          >
            Want to learn more about my process?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-6"
          >
            Discover how I approach design challenges and deliver impactful solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-muted-foreground transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg"
            >
              View Design Process
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
