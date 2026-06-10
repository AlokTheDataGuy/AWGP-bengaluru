import LoginForm from './LoginForm';

export const metadata = { title: 'Admin Login — AWGP Bengaluru' };

export default function AdminLoginPage() {
  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          {/* Simple flame icon */}
          <span style={{ fontSize: '2.5rem' }}>🔱</span>
        </div>
        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-sub">AWGP Bengaluru — Content Management</p>
        <LoginForm />
      </div>

      <style>{`
        body { background: var(--brown-dk) !important; }

        .admin-login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--brown-dk) 0%, #1a0a03 100%);
          padding: 2rem;
        }
        .admin-login-card {
          background: var(--cream);
          border-radius: var(--radius);
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 400px;
          text-align: center;
          box-shadow: var(--shadow-deep);
          border: 1px solid var(--border);
        }
        .admin-login-logo { margin-bottom: 1rem; }
        .admin-login-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--maroon);
          margin-bottom: 0.25rem;
        }
        .admin-login-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}
