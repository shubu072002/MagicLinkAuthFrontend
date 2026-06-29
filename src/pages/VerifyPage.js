import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyToken } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setErrorMsg('No token found in the URL. Please request a new magic link.');
      setStatus('error');
      return;
    }

    verifyToken(token)
      .then(async (res) => {
        await login(res.data.jwt);
        navigate('/dashboard', { replace: true });
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.error || 'Invalid or expired link. Please request a new one.');
        setStatus('error');
      });
  }, []); // eslint-disable-line

  return (
    <div className="auth-wrapper">
      <div className="auth-card verify-card">
        {status === 'verifying' ? (
          <div className="verify-loading">
            <div className="verify-spinner" />
            <h2>Signing you in…</h2>
            <p>Please wait while we verify your link.</p>
          </div>
        ) : (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Link invalid</h2>
            <p>{errorMsg}</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/login', { replace: true })}
            >
              Back to sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
