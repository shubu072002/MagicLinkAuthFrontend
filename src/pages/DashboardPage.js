import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const stats = [
  { label: 'Projects', value: '12', change: '+2 this month' },
  { label: 'Tasks done', value: '84', change: '+11 this week' },
  { label: 'Team members', value: '6', change: '2 online now' },
  { label: 'Uptime', value: '99.9%', change: 'Last 30 days' },
];

const activity = [
  { icon: '✅', text: 'Deployed v2.4.1 to production', time: '2 min ago' },
  { icon: '💬', text: 'New comment on API Design spec', time: '18 min ago' },
  { icon: '🔀', text: 'PR #47 merged into main', time: '1 hr ago' },
  { icon: '📋', text: 'Sprint planning meeting scheduled', time: '3 hr ago' },
  { icon: '🎯', text: 'Q2 goals document updated', time: 'Yesterday' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const initials = user?.email
    ? user.email.charAt(0).toUpperCase()
    : '?';

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon-sm">✦</span>
          <span>Luminary</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">⊞</span> Dashboard
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📁</span> Projects
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">✓</span> Tasks
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👥</span> Team
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙</span> Settings
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar">{initials}</div>
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
              <span className="user-role">Member</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Sign out">
            ⎋
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="page-header">
          <div>
            <h2 className="page-title">Dashboard</h2>
            <p className="page-subtitle">Welcome back, {user?.email?.split('@')[0]}!</p>
          </div>
          <div className="header-actions">
            <button className="btn-outline">Export</button>
            <button className="btn-primary-sm">+ New project</button>
          </div>
        </header>

        {/* Stats grid */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-change">{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Content row */}
        <div className="content-row">
          {/* Activity feed */}
          <div className="card activity-card">
            <h3 className="card-title">Recent activity</h3>
            <ul className="activity-list">
              {activity.map((item, i) => (
                <li className="activity-item" key={i}>
                  <span className="activity-icon">{item.icon}</span>
                  <span className="activity-text">{item.text}</span>
                  <span className="activity-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Auth info card */}
          <div className="card auth-info-card">
            <h3 className="card-title">Your session</h3>
            <div className="session-row">
              <span className="session-label">Email</span>
              <span className="session-value">{user?.email}</span>
            </div>
            <div className="session-row">
              <span className="session-label">Auth method</span>
              <span className="session-value badge">✉ Magic link</span>
            </div>
            <div className="session-row">
              <span className="session-label">Token</span>
              <span className="session-value">JWT · 24 hr expiry</span>
            </div>
            <div className="session-divider" />
            <button className="btn-danger-outline" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
