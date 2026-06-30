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

  // Oldest → newest for the chart; tallest bar sets the scale.
  const chartDays = [...recentDays].reverse();
  const maxVisits = Math.max(1, ...chartDays.map((d) => d.visits));

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
          <>
            <div className="chart-card">
              <div className="chart">
                {chartDays.map((d) => {
                  const totalH = (d.visits / maxVisits) * 100;
                  const newH = d.visits ? (d.new / d.visits) * totalH : 0;
                  return (
                    <div key={d.key} className="bar-col" title={`${formatDay(d.key)} — ${d.visits} visits, ${d.new} new`}>
                      <span className="bar-count">{d.visits || ''}</span>
                      <div className="bar-track">
                        <div className="bar-returning" style={{ height: `${totalH}%` }} />
                        <div className="bar-new" style={{ height: `${newH}%` }} />
                      </div>
                      <span className="bar-label">{formatDay(d.key)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="chart-legend">
                <span className="legend-item"><i className="swatch swatch-returning" /> Returning visits</span>
                <span className="legend-item"><i className="swatch swatch-new" /> New visitors</span>
              </div>
            </div>
          </>
        )}
        {recentDays.length === 0 ? null : (
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
        .chart-card {
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.5rem 1.5rem 1rem; margin-bottom: 1.5rem;
        }
        .chart {
          display: flex; align-items: flex-end; gap: clamp(4px, 1.5vw, 16px);
          height: 220px; padding-top: 1rem;
        }
        .bar-col {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          gap: 0.35rem; height: 100%; justify-content: flex-end; min-width: 0;
        }
        .bar-count { font-size: 0.7rem; color: var(--text-muted); height: 0.9rem; }
        .bar-track {
          position: relative; width: 100%; max-width: 38px; flex: 1;
          display: flex; align-items: flex-end;
        }
        .bar-returning, .bar-new {
          position: absolute; bottom: 0; left: 0; right: 0; border-radius: 4px 4px 0 0;
          transition: height 0.3s;
        }
        .bar-returning { background: var(--saffron); }
        .bar-new { background: var(--maroon); }
        .bar-label {
          font-size: 0.68rem; color: var(--text-muted); white-space: nowrap;
          transform: rotate(-45deg); transform-origin: center; height: 1.6rem;
        }
        .chart-legend {
          display: flex; gap: 1.5rem; justify-content: center; margin-top: 0.5rem;
          font-size: 0.8rem; color: var(--text-muted);
        }
        .legend-item { display: inline-flex; align-items: center; gap: 0.4rem; }
        .swatch { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
        .swatch-returning { background: var(--saffron); }
        .swatch-new { background: var(--maroon); }
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
