import { PortfolioDetail } from '../types/portfolio';

export const portfolioData: PortfolioDetail[] = [
  {
    id: '3',
    slug: 'atlassian',
    title: 'Jira Work Management',
    description: 'JWM was scaling fast, and we needed to keep up with the pace.',
    thumbnail: {
      src: '/portfolio/tile_atlassian.png',
      alt: 'JWM Importers User Experience',
      width: 320,
      height: 240
    },
    category: 'product-design',
    date: '2023-01-10',
    isProtected: true,
    tags: ['Product Design', 'User Testing', 'End-to-end'],
    featured: false,
    problemSpace: `Jira Work Management (JWM) was Atlassian's fastest growing product. Monthly Active Users (MAU) was growing at 90%+ YoY and the product is on track to reach 1 million MAU by the end of FY23. As JWM grew we were starting to see a pattern of users migrating to JWM from competitor products such as Clickup, Monday, Asana, and more. In particular, we were seeing this pattern emerge frequently in enterprise adoption of JWM where many customers were looking to consolidate onto Atlassian and reduce the sprawl of apps that their business teams use.
    <br><br>At the time, JWM provided very little migration support for our customers. Jira's existing import experience was incredibly difficult to use for a admin new to Jira and is limited by CSV import which means a lot of data can be lost in the transition to JWM.
    The poor migration experience from other tools was a major risk to unlocking JWM's full growth potential.
    `,
    process: `Introduce a full workflow to allow users coming from competing products to migrate their entire workflow, tasks, and users to JWM.`,
    layout: 'default',
    images: [
      {
        src: '/portfolio/jwm-importer/jwm-import-e2e.gif',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/jwm-importer/jwm-monday-select.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/jwm-importer/jwm-monday-review.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/jwm-importer/jwm-monday-fieldMapping.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/jwm-importer/jwm-monday-success.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      }
    ],
    results: {
      impact: 'Launched a reusable import workflow for any 3rd party product, allowing customers to effortless migrate to Jira and not lose any data or structure from their preivous project management tool.',
      metrics: [
        { text: '3rd Party Products via API', number: '6' },
        { text: 'Successful imports', number: '32k' },
        { text: 'Users migrated', number: '180k' },
        { text: 'Work items migrated', number: '12M+' }
      ],
      outcomes: [
        'Reusable components and experience for any future 3P product',
        'Reduced overall churn of migrating to JWM by 35%',
        'Introduced 7 new components to the Atlassian Design System'
      ]
    },
    technologies: ['Customer interviews', 'PRD spec', 'HiFi Design', 'Figma Prototype', 'SEQ Testing', 'Developer Spec'],
    duration: '16 weeks',
    teamSize: 20,
    role: 'Design Lead'
  },
  {
    id: '1',
    slug: 'visual-design-and-motion-design',
    title: 'Visual & Motion Design',
    description: 'Selected work from past projects that show my visual and motion design skill.',
    thumbnail: {
      src: '/portfolio/tile_latest.png',
      alt: 'Visual design work thumbnail',
      width: 320,
      height: 240
    },
    category: 'product-design',
    date: '2019-03-15',
    isProtected: false,
    tags: ['Visual Design', 'Animation', 'Design Systems'],
    featured: false,
    problemSpace: 'The existing mobile app had poor usability metrics, with users taking an average of 3.2 minutes to complete basic transactions. Customer support tickets related to app navigation were increasing by 15% month-over-month.',
    process: 'Conducted user research with 50+ users, created wireframes and prototypes, tested with 3 rounds of usability testing, and iterated based on feedback. Used Figma for design and Principle for animations.',
    layout: 'stacked',
    images: [
      {
        src: '/portfolio/port/jkr-port1.jpg',
        alt: 'User research findings and personas',
        caption: '',
        width: 2732,
        height: 4150
      },
      {
        src: '/portfolio/port/jkr-port2.jpg',
        alt: 'User research findings and personas',
        caption: '',
        width: 2732,
        height: 4754
      },
      {
        src: '/portfolio/port/jkr-port4.jpg',
        alt: 'User research findings and personas',
        caption: '',
        width: 2732,
        height: 4442
      },
      {
        src: '/portfolio/port/jkr-port5.jpg',
        alt: 'User research findings and personas',
        caption: '',
        width: 2732,
        height: 3256
      }
    ],
    results: {
      impact: 'Reduced transaction completion time by 45% and decreased support tickets by 60%.',
      metrics: [
        { text: 'Transaction completion time', number: '3.2min → 1.8min (-45%)' },
        { text: 'Support tickets', number: '-60%' },
        { text: 'User satisfaction', number: '6.2/10 → 8.7/10' },
        { text: 'App store rating', number: '3.1 → 4.3' }
      ],
      outcomes: [
        'Improved user engagement and retention',
        'Reduced customer support costs',
        'Increased app store visibility',
        'Positive user feedback and testimonials'
      ]
    },
    technologies: ['Figma', 'Principle', 'Sketch', 'InVision'],
    duration: '8 weeks',
    teamSize: 4,
    role: 'Lead Product Designer'
  },
  {
    id: '2',
    slug: 'sprint-telecommunications',
    title: 'Sprint Digital Tranformation',
    description: 'Sprint completed a digital tranformation with the help of VML and McKensey & Co. from 2015-2018.',
    thumbnail: {
      src: '/portfolio/tile_sprint.png',
      alt: 'Sprint Telecomms redesign',
      width: 320,
      height: 240
    },
    category: 'product-design',
    date: '2018-02-20',
    isProtected: false,
    tags: ['E-commerce', 'Design System', 'Web Design', 'User Research'],
    featured: false,
    problemSpace: 'Small businesses needed an affordable, easy-to-use e-commerce solution that could compete with larger platforms while maintaining brand identity.',
    process: 'Developed comprehensive design system, created responsive templates, conducted A/B testing on key user flows, and built component library for developers.',
    layout: 'stacked',
    images: [
      {
        src: '/portfolio/sprint/sprint_0.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/sprint/sprint_1.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/sprint/sprint_2.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/sprint/sprint_3.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/sprint/sprint_4.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/sprint/sprint_5.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/sprint/sprint_6.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      }
    ],
    results: {
      impact: 'Platform launched with 200+ small business customers and achieved 85% user satisfaction rate.',
      metrics: [
        { text: 'Customer acquisition', number: '200+ businesses' },
        { text: 'User satisfaction', number: '85%' },
        { text: 'Conversion rate', number: '3.2% (industry avg: 2.1%)' },
        { text: 'Time to first sale', number: '2.1 days' }
      ],
      outcomes: [
        'Successful platform launch',
        'Positive customer feedback',
        'Scalable design system',
        'Reduced development time'
      ]
    },
    technologies: ['Sketch', 'Storybook', 'Zeplin'],
    duration: '6 months',
    teamSize: 150,
    role: 'Director of Experience Design'
  },
  {
    id: '4',
    slug: 'gatorade-fan-loyalty',
    title: 'Gatorade sports app',
    description: 'A loyalty program designed for athletes who seek the path of self-improvement.',
    thumbnail: {
      src: '/portfolio/tile_loyalty.png',
      alt: 'Smart home control interface prototype',
      width: 320,
      height: 240
    },
    category: 'prototype',
    date: '2018-12-05',
    isProtected: false,
    tags: ['Prototyping', 'Mobile App', 'Gamification'],
    featured: false,
    problemSpace: 'Existing smart home systems required multiple apps and complex setup processes, creating friction for users.',
    process: 'Designed unified interface, created interactive prototypes, tested with 30 users, and iterated based on usability feedback.',
    layout: 'stacked',
    images: [
      {
        src: '/portfolio/gatorade/loyalty-1.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-2.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-3.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-4.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-5.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-6.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-7.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-8.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-9.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
      {
        src: '/portfolio/gatorade/loyalty-10.png',
        alt: '',
        caption: '',
        width: 800,
        height: 600
      },
    ],
    results: {
      impact: 'Prototype achieved 90% task completion rate and received positive feedback for intuitive interaction design.',
      metrics: [
        { text: 'Task completion rate', number: '90%' },
        { text: 'User satisfaction', number: '8.5/10' },
        { text: 'Setup time', number: '-65%' },
        { text: 'Feature discovery', number: '+80%' }
      ],
      outcomes: [
        'Validated design concept',
        'Improved user experience',
        'Reduced learning curve',
        'Enhanced feature accessibility'
      ]
    },
    technologies: ['Figma', 'Protopie', 'Adobe XD', 'UserTesting'],
    duration: '6 weeks',
    teamSize: 3,
    role: 'Interaction Designer'
  }
];

// Helper function to get portfolio pieces by category
export function getPortfolioByCategory(category: string): PortfolioDetail[] {
  return portfolioData.filter(piece => piece.category === category);
}

// Helper function to get featured portfolio pieces
export function getFeaturedPortfolio(): PortfolioDetail[] {
  return portfolioData.filter(piece => piece.featured);
}

// Helper function to get public portfolio pieces
export function getPublicPortfolio(): PortfolioDetail[] {
  return portfolioData.filter(piece => piece);
}

// Helper function to get portfolio piece by slug
export function getPortfolioBySlug(slug: string): PortfolioDetail | undefined {
  return portfolioData.find(piece => piece.slug === slug);
}

// Helper function to get navigation data for a portfolio piece
export function getPortfolioNavigation(currentSlug: string) {
  const currentIndex = portfolioData.findIndex(piece => piece.slug === currentSlug);
  if (currentIndex === -1) return null;

  return {
    current: portfolioData[currentIndex],
    previous: currentIndex > 0 ? portfolioData[currentIndex - 1] : undefined,
    next: currentIndex < portfolioData.length - 1 ? portfolioData[currentIndex + 1] : undefined
  };
}
