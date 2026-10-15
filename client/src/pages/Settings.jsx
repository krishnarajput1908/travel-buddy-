import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { authService } from '../services/authService';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Preferences form
  const [prefs, setPrefs] = useState({
    type: 'Adventure',
    budget: 'Standard',
    transport: 'Flight',
    notifications: {
      reminders: true,
      updates: true,
      promos: false
    }
  });

  // Password modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [toast, setToast] = useState(null);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);
  const [isSavingPass, setIsSavingPass] = useState(false);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (user?.preferences) {
      setPrefs({
        type: user.preferences.type || 'Adventure',
        budget: user.preferences.budget || 'Standard',
        transport: user.preferences.transport || 'Flight',
        notifications: {
          reminders: user.preferences.notifications?.reminders ?? true,
          updates: user.preferences.notifications?.updates ?? true,
          promos: user.preferences.notifications?.promos ?? false
        }
      });
    }
  }, [user]);

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setIsSavingPrefs(true);
    try {
      const res = await authService.updateProfile({ preferences: prefs });
      if (res.success && res.user) {
        updateUser(res.user);
        showToast('Preferences updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save preferences', 'error');
    } finally {
      setIsSavingPrefs(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    setIsSavingPass(true);
    try {
      const res = await authService.changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      if (res.success) {
        setIsPasswordModalOpen(false);
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        showToast('Password updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to change password', 'error');
    } finally {
      setIsSavingPass(false);
    }
  };

  return (
    <div className="section settings-page">
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
            <i className="fas fa-cog"></i> Configuration
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Account & App Settings</h1>
          <p className="text-muted">Customize your travel presets, security credentials, and app appearance</p>
        </div>

        {/* 1. Appearance / Theme */}
        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-palette text-primary"></i> Appearance
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Theme Mode</div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>
                Currently active: <strong style={{ textTransform: 'capitalize' }}>{theme}</strong> Mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <i className={theme === 'dark' ? 'fas fa-sun text-warning' : 'fas fa-moon'}></i>
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>

        {/* 2. Travel Preferences */}
        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-compass text-primary"></i> Travel Defaults
          </h3>

          <form onSubmit={handleSavePreferences}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label>Preferred Travel Style</label>
                <select
                  className="form-control"
                  value={prefs.type}
                  onChange={(e) => setPrefs({ ...prefs, type: e.target.value })}
                >
                  <option value="Adventure">Adventure & Hiking</option>
                  <option value="Beach">Beach & Tropical</option>
                  <option value="Heritage">Culture & Heritage</option>
                  <option value="Romantic">Romantic & Honeymoon</option>
                  <option value="Spiritual">Spiritual & Yoga</option>
                  <option value="City">City Life & Shopping</option>
                </select>
              </div>

              <div className="form-group">
                <label>Budget Tier</label>
                <select
                  className="form-control"
                  value={prefs.budget}
                  onChange={(e) => setPrefs({ ...prefs, budget: e.target.value })}
                >
                  <option value="Budget">Budget Backpacking</option>
                  <option value="Standard">Standard / Comfortable</option>
                  <option value="Luxury">Luxury / 5-Star</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preferred Transport</label>
                <select
                  className="form-control"
                  value={prefs.transport}
                  onChange={(e) => setPrefs({ ...prefs, transport: e.target.value })}
                >
                  <option value="Flight">Flight (Fastest)</option>
                  <option value="Train">Train (Scenic)</option>
                  <option value="Bus">Luxury Bus / Coach</option>
                  <option value="Self-drive">Self-Drive / Car Rental</option>
                </select>
              </div>
            </div>

            {/* Notification checkboxes */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Notification Preferences</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={prefs.notifications.reminders}
                    onChange={(e) => setPrefs({
                      ...prefs,
                      notifications: { ...prefs.notifications, reminders: e.target.checked }
                    })}
                    style={{ accentColor: 'var(--primary-color)', width: '18px', height: '18px' }}
                  />
                  <span>Trip schedule countdown reminders (48h before departure)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={prefs.notifications.updates}
                    onChange={(e) => setPrefs({
                      ...prefs,
                      notifications: { ...prefs.notifications, updates: e.target.checked }
                    })}
                    style={{ accentColor: 'var(--primary-color)', width: '18px', height: '18px' }}
                  />
                  <span>Booking confirmation emails and real-time updates</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={prefs.notifications.promos}
                    onChange={(e) => setPrefs({
                      ...prefs,
                      notifications: { ...prefs.notifications, promos: e.target.checked }
                    })}
                    style={{ accentColor: 'var(--primary-color)', width: '18px', height: '18px' }}
                  />
                  <span>Curated weekend destination deals and seasonal offers</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" disabled={isSavingPrefs}>
                {isSavingPrefs ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Save Preferences
              </button>
            </div>
          </form>
        </div>

        {/* 3. Security Section */}
        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-shield-alt text-primary"></i> Account Security
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Password</div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>
                Ensure your account is using a long and random password to stay secure.
              </p>
            </div>
            <button onClick={() => setIsPasswordModalOpen(true)} className="btn btn-outline">
              <i className="fas fa-key"></i> Change Password
            </button>
          </div>
        </div>

        {/* 4. Danger Zone */}
        <div
          className="card"
          style={{
            padding: '2rem',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'rgba(239, 68, 68, 0.03)'
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-exclamation-triangle"></i> Session & Danger Zone
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Log Out of Travel Buddy</div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>
                Sign out of your active session on this browser.
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  logout();
                }
              }}
              className="btn btn-outline"
              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
            >
              <i className="fas fa-sign-out-alt"></i> Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Update Account Password"
      >
        <form onSubmit={handleChangePassword}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Current Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={passwords.oldPassword}
              onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>New Password (min. 6 characters)</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSavingPass}>
              {isSavingPass ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-check"></i>} Update Password
            </button>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Settings;
