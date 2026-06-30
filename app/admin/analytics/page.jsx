import Link from 'next/link';
import LogoutButton from '../LogoutButton';
import { getAnalytics } from '../../../lib/analytics';

export const metadata = { title: 'Visitors — Admin' };
export const dynamic = 'force-dynamic'; // always read the latest counts

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function formatDay(key) {
  return new Date(key + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

export default function AnalyticsPage() {
  const stats = getAnalytics();
  const today = stats.daily[todayKey()] || { visits: 0, new: 0 };

  const cards = [
    { label: 'Total Visitors', value: stats.uniqueVisitors, hint: 'Unique people (all time)' },
    { label: 'Total Visits', value: stats.totalVisits, hint: 'All page views' },
    { label: 'New Visitors (today)', value: today.new, hint: 'First-time today' },
    { label: 'Visits (today)', value: today.visits, hint: 'Page views today' },
  ];

  const recentDays = Object.keys(stats.daily)
    .sort()
    .reverse()
    .slice(0, 14)
    .map((key) => ({ key, ...stats.daily[key] }));

  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div>
            <h1 className="admin-title">📊 Visitors</h1>
            <p className="admin-sub">
              <Link href="/admin" style={{ color: 'rgba(255,255,255,0.6)' }}>← Dashboard</Link>
            </p>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="admin-content">
        <div className="stat-grid">
          {cards.map((c) => (
            <div key={c.label} className="stat-card">
              <span className="stat-value">{c.value.toLocaleString('en-IN')}</span>
              <span className="stat-label">{c.label}</span>
              <span className="stat-hint">{c.hint}</span>
            </div>
          ))}
        </div>

        <h2 className="section-title">Last 14 days</h2>
        {recentDays.length === 0 ? (
          <p className="empty">No visits recorded yet.</p>
        ) : (
          <table className="stat-table">
            <thead>
              <tr><th>Date</th><th>Visits</th><th>New visitors</th></tr>
            </thead>
            <tbody>
              {recentDays.map((d) => (
                <tr key={d.key}>
                  <td>{formatDay(d.key)}</td>
                  <td>{d.visits.toLocaleString('en-IN')}</td>
                  <td>{d.new.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .admin-wrap { min-height: 100vh; background: var(--cream); padding-bottom: 4rem; }
        .admin-header { background: var(--brown-dk); padding: 1.5rem 0; margin-bottom: 2.5rem; }
        .admin-header-inner {
          max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 60px);
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .admin-title { font-family: var(--font-serif); font-size: 1.6rem; color: #fff; margin-bottom: 0.15rem; }
        .admin-sub { font-size: 0.82rem; }
        .admin-content { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 60px); }
        .stat-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem; margin-bottom: 3rem;
        }
        .stat-card {
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.6rem; display: flex; flex-direction: column; gap: 0.3rem;
        }
        .stat-value { font-family: var(--font-serif); font-size: 2.4rem; color: var(--maroon); line-height: 1; }
        .stat-label { font-size: 0.95rem; font-weight: 600; color: var(--text); }
        .stat-hint { font-size: 0.78rem; color: var(--text-muted); }
        .section-title { font-family: var(--font-serif); font-size: 1.3rem; color: var(--maroon); margin-bottom: 1rem; }
        .empty { color: var(--text-muted); font-size: 0.9rem; }
        .stat-table {
          width: 100%; border-collapse: collapse; background: var(--white);
          border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;
        }
        .stat-table th, .stat-table td {
          text-align: left; padding: 0.7rem 1rem; font-size: 0.9rem;
          border-bottom: 1px solid var(--border);
        }
        .stat-table th { background: var(--cream); color: var(--text-muted); font-weight: 600; }
        .stat-table tr:last-child td { border-bottom: none; }
      `}</style>
    </div>
  );
}
