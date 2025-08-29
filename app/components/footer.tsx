'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-muted/50 border-t border-border py-8 mt-16 p-8">
        <p className="text-sm text-muted-foreground">
          © {currentYear} John Kelly Resman. All rights reserved.<br/>This website is built with Next.js, Tailwind CSS, and Framer Motion. Vibe coded with Cursor.
        </p>
    </footer>
  );
}
