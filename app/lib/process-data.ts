import { 
  LightBulbIcon, 
  UserGroupIcon, 
  CogIcon, 
  ChartBarIcon, 
  RocketLaunchIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export interface ProcessStep {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: string[];
  duration: string;
  deliverables: string[];
}

export interface DesignPrinciple {
  title: string;
  description: string;
  examples: string[];
}

export interface ToolCategory {
  category: string;
  items: string[];
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery & Research",
    icon: LightBulbIcon,
    description: "Understanding the problem space, user needs, and business context",
    details: [
      "User interviews and ethnographic research",
      "Competitive analysis and market research",
      "Stakeholder interviews and business requirements",
      "Data analysis and user behavior insights",
      "Problem statement definition and validation"
    ],
    duration: "1-2 weeks",
    deliverables: ["Research report", "User personas", "Problem statement", "Success metrics"]
  },
  {
    id: 2,
    title: "Ideation & Strategy",
    icon: UserGroupIcon,
    description: "Generating solutions and defining the strategic approach",
    details: [
      "Design thinking workshops and brainstorming",
      "User journey mapping and service design",
      "Information architecture and content strategy",
      "Feature prioritization and roadmap planning",
      "Design principles and guidelines definition"
    ],
    duration: "1-2 weeks",
    deliverables: ["User journey maps", "Information architecture", "Design strategy", "Feature roadmap"]
  },
  {
    id: 3,
    title: "Design & Prototyping",
    icon: CogIcon,
    description: "Creating detailed designs and interactive prototypes",
    details: [
      "Wireframing and low-fidelity prototyping",
      "Visual design and design system creation",
      "High-fidelity prototyping and interactions",
      "User interface design and component library",
      "Accessibility and responsive design implementation"
    ],
    duration: "2-3 weeks",
    deliverables: ["Wireframes", "Design system", "High-fidelity prototypes", "Component library"]
  },
  {
    id: 4,
    title: "Testing & Validation",
    icon: ChartBarIcon,
    description: "Validating designs through user testing and feedback",
    details: [
      "Usability testing and user feedback sessions",
      "A/B testing and performance analysis",
      "Accessibility testing and compliance checks",
      "Stakeholder reviews and design critiques",
      "Iteration based on feedback and insights"
    ],
    duration: "1-2 weeks",
    deliverables: ["Usability test results", "User feedback report", "Design iterations", "Final designs"]
  },
  {
    id: 5,
    title: "Implementation & Launch",
    icon: RocketLaunchIcon,
    description: "Supporting development and ensuring successful launch",
    details: [
      "Design handoff and developer collaboration",
      "Quality assurance and design review",
      "Launch preparation and go-to-market strategy",
      "Post-launch monitoring and optimization",
      "Documentation and knowledge transfer"
    ],
    duration: "2-4 weeks",
    deliverables: ["Design specifications", "Launch strategy", "Success metrics", "Documentation"]
  }
];

export const designPrinciples: DesignPrinciple[] = [
  {
    title: "User-Centered Design",
    description: "Every decision is made with the user's needs, goals, and context in mind. I believe that great design happens when we deeply understand and empathize with the people we're designing for.",
    examples: ["User research and interviews", "Usability testing", "User journey mapping", "Accessibility considerations"]
  },
  {
    title: "Evidence-Based Design",
    description: "Design decisions are informed by data, research, and testing rather than assumptions or personal preferences. I use both qualitative and quantitative data to validate design choices.",
    examples: ["A/B testing", "Analytics analysis", "User feedback", "Performance metrics"]
  },
  {
    title: "Iterative Approach",
    description: "Design is a process of continuous improvement. I believe in rapid prototyping, testing, and iteration to refine solutions based on real user feedback and business outcomes.",
    examples: ["Rapid prototyping", "User testing cycles", "Design sprints", "Continuous iteration"]
  },
  {
    title: "Collaborative Design",
    description: "Great design happens through collaboration with cross-functional teams, stakeholders, and users. I work closely with developers, product managers, and business stakeholders.",
    examples: ["Design workshops", "Stakeholder alignment", "Developer collaboration", "User co-creation"]
  },
  {
    title: "Systematic Thinking",
    description: "I design with systems in mind, creating scalable solutions that work together cohesively. This includes design systems, component libraries, and consistent patterns.",
    examples: ["Design systems", "Component libraries", "Pattern libraries", "Scalable solutions"]
  }
];

export const toolsAndMethods: ToolCategory[] = [
  {
    category: "Design & Prototyping",
    items: ["Figma", "Figma Make", "Adobe Creative Suite", "Principle", "Framer", "Cursor AI"]
  },
  {
    category: "Research & Testing",
    items: ["UserTesting", "Lookback", "Customer interviews", "Behavioural Analytics", "Optimal Workshop"]
  },
  {
    category: "Collaboration & Management",
    items: ["Notion", "Miro", "Slack", "Jira", "Confluence", "Loom"]
  },
  {
    category: "Development & Handoff",
    items: ["Storybook", "Zeplin", "Figma", "GitHub", "VS Code", "Chrome DevTools"]
  }
];

// Visual Elements Data
export interface ProcessFlowStep {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

export interface TimelinePhase {
  id: number;
  title: string;
  duration: string;
  weeks: number;
  color: string;
  description: string;
}

export interface Metric {
  id: number;
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

export const processFlowSteps: ProcessFlowStep[] = [
  {
    id: 1,
    title: "Discovery",
    icon: LightBulbIcon,
    description: "Research & analysis",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Ideation",
    icon: UserGroupIcon,
    description: "Strategy & planning",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Design",
    icon: CogIcon,
    description: "Prototyping & UI",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Testing",
    icon: ChartBarIcon,
    description: "Validation & feedback",
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "Launch",
    icon: RocketLaunchIcon,
    description: "Implementation & delivery",
    color: "bg-red-500"
  }
];

export const timelinePhases: TimelinePhase[] = [
  {
    id: 1,
    title: "Discovery & Research",
    duration: "1-2 weeks",
    weeks: 2,
    color: "bg-blue-500",
    description: "Understanding user needs and business context through research and analysis"
  },
  {
    id: 2,
    title: "Ideation & Strategy",
    duration: "1-2 weeks",
    weeks: 2,
    color: "bg-green-500",
    description: "Developing design strategy and creating initial concepts and wireframes"
  },
  {
    id: 3,
    title: "Design & Prototyping",
    duration: "2-3 weeks",
    weeks: 3,
    color: "bg-purple-500",
    description: "Creating detailed designs, prototypes, and design systems"
  },
  {
    id: 4,
    title: "Testing & Validation",
    duration: "1-2 weeks",
    weeks: 2,
    color: "bg-orange-500",
    description: "User testing, feedback collection, and design iteration"
  },
  {
    id: 5,
    title: "Implementation & Launch",
    duration: "2-4 weeks",
    weeks: 3,
    color: "bg-red-500",
    description: "Development handoff, quality assurance, and product launch"
  }
];

export const designMetrics: Metric[] = [
  {
    id: 1,
    title: "User Satisfaction",
    value: "85%",
    description: "Average increase in user satisfaction scores after implementing user-centered design",
    icon: UserGroupIcon,
    color: "bg-blue-500",
    trend: "up"
  },
  {
    id: 2,
    title: "Task Completion",
    value: "40%",
    description: "Improvement in task completion rates through better UX design",
    icon: CheckCircleIcon,
    color: "bg-green-500",
    trend: "up"
  },
  {
    id: 3,
    title: "Development Time",
    value: "30%",
    description: "Reduction in development time due to clear design specifications",
    icon: ClockIcon,
    color: "bg-purple-500",
    trend: "down"
  },
  {
    id: 4,
    title: "Cost Savings",
    value: "$50K+",
    description: "Average cost savings from reduced iterations and faster development",
    icon: CurrencyDollarIcon,
    color: "bg-orange-500",
    trend: "up"
  },
  {
    id: 5,
    title: "Conversion Rate",
    value: "25%",
    description: "Increase in conversion rates through improved user experience",
    icon: ChartBarIcon,
    color: "bg-red-500",
    trend: "up"
  },
  {
    id: 6,
    title: "Support Tickets",
    value: "60%",
    description: "Reduction in support tickets due to better usability",
    icon: CheckCircleIcon,
    color: "bg-teal-500",
    trend: "down"
  }
];
