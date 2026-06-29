import React, { useState } from 'react';
import { sendMagicLink } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await sendMagicLink(email.trim());
      setStatus('sent');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Logo / Brand */}
        <div className="brand">
          <div className="brand-icon">✦</div>
          <h1 className="brand-name">Hornvin</h1>
          <p className="brand-tagline">Sign in without a password</p>
        </div>

        {status === 'sent' ? (
          <div className="success-state">
            <div className="success-icon">📬</div>
            <h2>Check your inbox</h2>
            <p>
              We sent a magic link to <strong>{email}</strong>.
              Click it to sign in — it expires in 15 minutes.
            </p>
            <button
              className="btn-ghost"
              onClick={() => { setStatus('idle'); setEmail(''); }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                autoFocus
                required
              />
            </div>

            {status === 'error' && (
              <div className="error-banner">{errorMsg}</div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading' || !email.trim()}
            >
              {status === 'loading' ? (
                <span className="btn-loading">
                  <span className="btn-spinner" />
                  Sending link…
                </span>
              ) : (
                'Send magic link →'
              )}
            </button>

            <p className="hint">
              No password needed. We'll email you a one-time sign-in link.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
