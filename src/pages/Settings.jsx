import { useState, useRef } from 'react';
import { exportData, importData, clearAllData } from '../utils/storage';
import { useApp } from '../utils/AppContext';
import {
  Download,
  Upload,
  RotateCcw,
  User,
  LogOut,
  Info,
  Flame,
  Check,
  AlertTriangle,
  Zap,
} from 'lucide-react';

export default function Settings({ state, onImport, onReset }) {
  const { logout, updateUser } = useApp();
  const user = state?.user || {};
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName || 'Johnny Blaze');
  const fileRef = useRef(null);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    updateUser({ displayName: displayName.trim() });
    setIsEditingUser(false);
    setMessage('Profile updated successfully.');
    setError('');
  };

  const handleExport = () => {
    exportData(state);
    setMessage('Data exported successfully.');
    setError('');
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importData(file);
      onImport(data);
      setMessage('Data imported successfully.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
    e.target.value = '';
  };

  const handleReset = () => {
    if (
      window.confirm(
        'This will permanently delete all habits, progress, XP, and achievements. Are you sure?'
      )
    ) {
      clearAllData();
      onReset();
      setMessage('All data has been reset.');
      setError('');
    }
  };

  return (
    <div className="page settings-page">
      <div className="page-header">
        <div>
          <h1>Settings & Account Profile</h1>
          <p className="page-subtitle">Manage your account profile, application preferences, and data backups.</p>
        </div>
      </div>

      <div className="settings-sections">
        {/* User Profile Card */}
        <section className="settings-card">
          <div className="settings-card-header">
            <User size={20} color="#ff4500" />
            <h3>User Identity</h3>
          </div>
          
          <div className="user-profile-editor">
            {!isEditingUser ? (
              <div className="user-profile-display">
                <div className="user-avatar-large">
                  <Flame size={32} color="#ff4500" />
                </div>
                <div className="user-details-text">
                  <h4 className="user-display-name">{user.displayName || 'Johnny Blaze'}</h4>
                  <p className="user-email-text">{user.email || 'rider@ignitehabits.com'}</p>
                  <span className="user-title-tag">
                    <Zap size={12} /> {user.title || 'Consistency Member'}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsEditingUser(true)}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="user-profile-form">
                <div className="form-group">
                  <label htmlFor="user-name">Display Name</label>
                  <input
                    id="user-name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setIsEditingUser(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Check size={14} /> Save Changes
                  </button>
                </div>
              </form>
            )}

            <div className="logout-wrapper">
              <button type="button" className="btn btn-secondary btn-block" onClick={logout}>
                <LogOut size={16} /> Sign Out of Account
              </button>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="settings-card">
          <div className="settings-card-header">
            <Download size={20} color="#ff8c00" />
            <h3>Data Backup & Restore</h3>
          </div>
          <p>Export your progress as a JSON backup or import a previous JSON backup file.</p>
          <div className="settings-actions">
            <button className="btn btn-primary" onClick={handleExport}>
              <Download size={16} /> Export Backup
            </button>
            <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
              <Upload size={16} /> Import Backup
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              hidden
            />
          </div>
        </section>

        {/* Danger Zone */}
        <section className="settings-card settings-card--danger">
          <div className="settings-card-header">
            <AlertTriangle size={20} color="#ff1a1a" />
            <h3>Reset Application Data</h3>
          </div>
          <p>Permanently delete all habits, completions, XP, and achievements. This action cannot be undone.</p>
          <button className="btn btn-danger" onClick={handleReset}>
            <RotateCcw size={16} /> Reset All Data
          </button>
        </section>

        {/* About */}
        <section className="settings-card">
          <div className="settings-card-header">
            <Info size={20} color="#00d2ff" />
            <h3>About Ignite Habits</h3>
          </div>
          <p><strong>Ignite Habits Tracker</strong> v1.0.0</p>
          <p className="settings-about">
            A professional habit tracker built with vector SVG graphics, responsive multi-device support (PC & Android PWA),
            dynamic HTML5 particle flame animations, local storage privacy, and level ascension mechanics.
          </p>
        </section>
      </div>

      {message && <div className="settings-message settings-message--success">{message}</div>}
      {error && <div className="settings-message settings-message--error">{error}</div>}
    </div>
  );
}
