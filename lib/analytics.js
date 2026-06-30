import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'analytics.json');

const emptyStats = () => ({
  totalVisits: 0,      // every page view (ping)
  uniqueVisitors: 0,   // distinct people (first-ever visit)
  returningVisits: 0,  // visits from people we've seen before
  daily: {},           // { 'YYYY-MM-DD': { visits, new } }
});

function todayKey() {
  // Server local date — good enough for a single-region site.
  return new Date().toISOString().slice(0, 10);
}

export function getAnalytics() {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return { ...emptyStats(), ...JSON.parse(raw) };
  } catch {
    return emptyStats();
  }
}

function save(stats) {
  fs.writeFileSync(filePath, JSON.stringify(stats, null, 2), 'utf-8');
}

/**
 * Record a single page view.
 * @param {boolean} isNew - true when the visitor has no prior visitor cookie.
 */
export function recordVisit(isNew) {
  const stats = getAnalytics();
  const day = todayKey();

  stats.totalVisits += 1;
  if (isNew) stats.uniqueVisitors += 1;
  else stats.returningVisits += 1;

  const d = stats.daily[day] || { visits: 0, new: 0 };
  d.visits += 1;
  if (isNew) d.new += 1;
  stats.daily[day] = d;

  save(stats);
  return stats;
}
