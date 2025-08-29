'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-2 text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      {/* Home Link */}
      <Link
        href="/"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <HomeIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
          
          {item.isCurrent ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item.label}
            </span>
          ) : item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-muted-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </motion.nav>
  );
}
