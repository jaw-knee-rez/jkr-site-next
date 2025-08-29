import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/theme-context";
import PageTransition from "./components/page-transition";
// Temporarily commented out for build issues
// import ResponsiveTest from "./components/responsive-test";
// import AccessibilityTest from "./components/accessibility-test";
// import PerformanceTest from "./components/performance-test";
// import BrowserCompatibilityTest from "./components/browser-compatibility-test";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Resman - Product Designer Portfolio",
  description: "Product designer portfolio showcasing innovative design solutions and creative problem-solving approaches.",
  keywords: ["product design", "UX design", "portfolio", "designer"],
  authors: [{ name: "John Resman" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider>
          <PageTransition>
            {children}
          </PageTransition>
          {/* Temporarily commented out for build issues */}
          {/* <ResponsiveTest />
          <AccessibilityTest />
          <PerformanceTest />
          <BrowserCompatibilityTest /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
