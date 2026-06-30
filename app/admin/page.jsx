import Link from 'next/link';
import LogoutButton from './LogoutButton';

export const metadata = { title: 'Admin Dashboard — AWGP Bengaluru' };

const sections = [
  { key: 'activities', label: 'Activities', icon: '🌿', desc: 'Blood donation, tree plantation, hospital visits…' },
  { key: 'sanskars',   label: 'Sanskars',   icon: '🪔', desc: 'Naamkaran, Annaprashan, Vivah, Deeksha…' },
  { key: 'programs',   label: 'Programs',   icon: '📅', desc: 'Upcoming programs shown on the homepage' },
  { key: 'schedule',   label: 'Schedule',   icon: '🕐', desc: 'Daily morning, evening and Sunday timings' },
  { key: 'site',       label: 'Site Content', icon: '⚙️', desc: 'Global text: footer tagline, contact info…' },
];

export default function AdminDashboard() {
  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div>
            <h1 className="admin-title">🔱 Content Dashboard</h1>
            <p className="admin-sub">AWGP Bengaluru — select a section to edit</p>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="admin-grid">
        <Link href="/admin/analytics" className="admin-card">
          <span className="admin-card-icon">📊</span>
          <h2 className="admin-card-label">Visitors</h2>
          <p className="admin-card-desc">Total visitors, new visitors and daily traffic</p>
          <span className="admin-card-cta">View →</span>
        </Link>
        {sections.map((s) => (
          <Link key={s.key} href={`/admin/${s.key}`} className="admin-card">
            <span className="admin-card-icon">{s.icon}</span>
            <h2 className="admin-card-label">{s.label}</h2>
            <p className="admin-card-desc">{s.desc}</p>
            <span className="admin-card-cta">Edit →</span>
          </Link>
        ))}
      </div>

      <style>{`
        .admin-wrap {
          min-height: 100vh;
          background: var(--cream);
          padding-bottom: 4rem;
        }
        .admin-header {
          background: var(--brown-dk);
          padding: 1.5rem 0;
          margin-bottom: 3rem;
        }
        .admin-header-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .admin-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #fff;
          margin-bottom: 0.15rem;
        }
        .admin-sub { color: rgba(255,255,255,0.55); font-size: 0.82rem; }
        .admin-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 60px);
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .admin-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.8rem;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .admin-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-warm);
          border-color: var(--saffron);
        }
        .admin-card-icon { font-size: 2rem; margin-bottom: 0.3rem; }
        .admin-card-label {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--maroon);
        }
        .admin-card-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
        .admin-card-cta {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--saffron);
          margin-top: 0.5rem;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}
