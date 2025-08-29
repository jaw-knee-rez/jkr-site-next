import { notFound } from 'next/navigation';
import { getPortfolioBySlug, getPortfolioNavigation } from '../../lib/portfolio-data';
import { Metadata } from 'next';
import PortfolioLayoutWrapper from '../../components/portfolio-layout-wrapper';

interface PortfolioPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPortfolioBySlug(slug);
  
  if (!piece) {
    return {
      title: 'Portfolio Piece Not Found',
      description: 'The requested portfolio piece could not be found.'
    };
  }

  return {
    title: `${piece.title} - Portfolio`,
    description: piece.description,
    keywords: piece.tags,
    openGraph: {
      title: piece.title,
      description: piece.description,
      images: [
        {
          url: piece.thumbnail.src,
          width: piece.thumbnail.width,
          height: piece.thumbnail.height,
          alt: piece.thumbnail.alt,
        },
      ],
    },
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  const piece = getPortfolioBySlug(slug);
  
  if (!piece) {
    notFound();
  }

  const navigation = getPortfolioNavigation(slug);

  return <PortfolioLayoutWrapper piece={piece} navigation={navigation} />;
}
