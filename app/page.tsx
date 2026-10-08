'use client';

import BioSection from './components/bio-section';
import PortfolioGallery from './components/portfolio-gallery';
import Footer from './components/footer';
import Logo from './components/logo';
import { getPublicPortfolio, getFeaturedPortfolio } from './lib/portfolio-data';
import dynamic from 'next/dynamic';


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
          'AI-assisted design workflows',
          'Agentic Systems Design',
          'Visual Design',
          'UX/UI Design',
          'Design Systems',
          'Prototyping',
          'User Research',
          'User Testing',
          'Information Architecture',
          'Interaction Design',
          'Design Strategy',
          'Design Leadership',
          'People Management',
          'Figma',
          'Cursor/Zed',
        ]}
        experience="15+ years"
        location="Sydney, Australia"
        email="resman.jk@gmail.com"
        linkedin="https://linkedin.com/in/jkresman"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
