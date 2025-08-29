'use client';

import PortfolioDetail from './portfolio-detail';
import PortfolioStackedLayout from './portfolio-stacked-layout';
import { PortfolioDetail as PortfolioDetailType, PortfolioNavigation } from '../types/portfolio';

interface PortfolioLayoutWrapperProps {
  piece: PortfolioDetailType;
  navigation: PortfolioNavigation | null;
}

export default function PortfolioLayoutWrapper({ piece, navigation }: PortfolioLayoutWrapperProps) {
  // Choose layout based on the piece's layout field
  if (piece.layout === 'stacked') {
    return <PortfolioStackedLayout piece={piece} navigation={navigation} />;
  }
  
  // Default to the original layout
  return <PortfolioDetail piece={piece} navigation={navigation} />;
}
