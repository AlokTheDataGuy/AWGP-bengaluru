'use client';

import HighlightsClient from '../ui/HighlightsClient';
import './HomeHighlights.css';

/**
 * Homepage teaser — the same highlights section as the Press & Highlights
 * page, limited to the latest few items, with filters hidden and a
 * "View All Highlights" link to the full page.
 */
export default function HomeHighlights() {
  return (
    <HighlightsClient
      className="home-highlights"
      limit={4}
      showFilters={false}
      showViewAll
      viewAllHref="/media/news"
    />
  );
}
