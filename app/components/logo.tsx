'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="fixed top-6 left-6 z-50 w-14 h-14 flex items-center justify-center hover:scale-105 transition-transform duration-200">
      <Image
        src="/jkr-logo.svg"
        alt="JKR Logo"
        width={32}
        height={32}
        className="w-8 h-8"
        priority
      />
    </Link>
  );
}
