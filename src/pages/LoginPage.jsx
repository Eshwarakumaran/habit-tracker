import { useState } from 'react';
import { Mail, Lock, User, Flame, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import FlameCanvas from '../components/FlameCanvas';

const AVATARS = [
  { id: 'executive', name: 'Executive', icon: '⚡' },
  { id: 'flame-skull', name: 'Ignite', icon: '🔥' },
  { id: 'master', name: 'Strategist', icon: '🎯' },
  { id: 'champion', name: 'Champion', icon: '🏆' },
];

export default function LoginPage({ onLogin, onSignup }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    avatar: 'executive',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email || !form.email.includes('@')) {
      newErrors.email = 'Valid email address is required.';
    }
    if (!form.password || form.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters.';
    }
    if (isSignUp && (!form.displayName || form.displayName.trim().length < 2)) {
      newErrors.displayName = 'Full name is required (min 2 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isSignUp) {
      onSignup({
        displayName: form.displayName.trim(),
        email: form.email.trim(),
        avatar: form.avatar,
      });
    } else {
      onLogin({
        email: form.email.trim(),
        displayName: form.email.split('@')[0],
      });
    }
  };

  const handleDemoLogin = () => {
    onLogin({
      email: 'johnny.blaze@ignitehabits.com',
      displayName: 'Johnny Blaze',
    });
  };

  return (
    <div className="login-container">
      <FlameCanvas />

      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand">
          <div className="login-logo-glow">
            <Flame size={48} className="login-flame-icon" />
          </div>
          <h1 className="login-title">IGNITE HABITS</h1>
          <p className="login-subtitle">Master your daily routines. Fuel your success.</p>
        </div>

        {/* Tab Switcher */}
        <div className="login-tabs">
          <button
            className={`login-tab ${!isSignUp ? 'login-tab--active' : ''}`}
            onClick={() => {
              setIsSignUp(false);
              setErrors({});
            }}
          >
            <Lock size={16} /> Sign In
          </button>
          <button
            className={`login-tab ${isSignUp ? 'login-tab--active' : ''}`}
            onClick={() => {
              setIsSignUp(true);
              setErrors({});
            }}
          >
            <Sparkles size={16} /> Create Account
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <div className="form-group">
              <label>
                <User size={16} /> Full Name
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  placeholder="e.g. Johnny Blaze"
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  className={errors.displayName ? 'input-error' : ''}
                />
              </div>
              {errors.displayName && <span className="form-error">{errors.displayName}</span>}
            </div>
          )}

          <div className="form-group">
            <label>
              <Mail size={16} /> Email Address
            </label>
            <div className="input-with-icon">
              <input
                type="email"
                placeholder="rider@ignitehabits.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={errors.email ? 'input-error' : ''}
              />
            </div>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>
              <Lock size={16} /> Password
            </label>
            <div className="input-with-icon password-input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Select Profile Crest</label>
              <div className="avatar-picker">
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    className={`avatar-option ${form.avatar === av.id ? 'avatar-option--selected' : ''}`}
                    onClick={() => setForm({ ...form, avatar: av.id })}
                  >
                    <span className="avatar-icon">{av.icon}</span>
                    <span className="avatar-label">{av.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block btn-lg login-submit-btn">
            <Flame size={20} />
            <span>{isSignUp ? 'Create Account & Start' : 'Sign In & Continue'}</span>
            <ArrowRight size={20} />
          </button>
        </form>

        {/* Demo Login Option */}
        <div className="login-divider">
          <span>OR QUICK ACCESS</span>
        </div>

        <button type="button" className="btn btn-secondary btn-block demo-btn" onClick={handleDemoLogin}>
          <ShieldCheck size={18} className="demo-icon" />
          <span>Instant Demo Access (Demo Account)</span>
        </button>

        <p className="login-footer-text">
          Runs on PC & Android • Secured Local Storage • Offline Supported
        </p>
      </div>
    </div>
  );
}
