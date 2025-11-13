/**
 * HeaderAuthenticated Component
 * Authenticated header matching Bubble.io logged-in state
 * Shows: Logo | View Active Proposals | Notifications | User Profile
 */

import { useState } from 'react';
import '../Header.css';
import './HeaderAuthenticated.css';

interface HeaderAuthenticatedProps {
  userName?: string;
  activeProposalsCount?: number;
  notificationsCount?: number;
}

const HeaderAuthenticated: React.FC<HeaderAuthenticatedProps> = ({
  userName = 'Rod',
  activeProposalsCount = 2,
  notificationsCount = 9
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProposalsClick = () => {
    window.location.href = '/proposals';
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  return (
    <header className="main-header authenticated-header">
      <nav className="nav-container">
        {/* Logo */}
        <a href="https://app.split.lease" className="logo">
          <img
            src="https://splitlease.app/cdn-cgi/image/quality=100,format=auto/https://d3pxndajt94xw2.cloudfront.net/content/Split%20Lease%20Logo%20Split%20Lease%20Logo%20Only.svg"
            alt="Split Lease Logo"
            className="logo-image"
          />
          <span className="logo-text">Split Lease</span>
        </a>

        {/* Center: Active Proposals Button */}
        <div className="nav-center-auth">
          <button className="proposals-button" onClick={handleProposalsClick}>
            View Active Proposals ({activeProposalsCount})
          </button>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="nav-right-auth">
          {/* Notifications */}
          <div className="notification-wrapper">
            <button
              className="notification-button"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {notificationsCount > 0 && (
                <span className="notification-badge">
                  {notificationsCount > 9 ? '9+' : notificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="dropdown-header">
                  <h4>Notifications</h4>
                  <button className="mark-read-btn">Mark all as read</button>
                </div>
                <div className="notifications-list">
                  <div className="notification-item unread">
                    <div className="notification-icon">📩</div>
                    <div className="notification-content">
                      <p className="notification-text">New message from Patricia P</p>
                      <span className="notification-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="notification-item unread">
                    <div className="notification-icon">✨</div>
                    <div className="notification-content">
                      <p className="notification-text">Your proposal was accepted!</p>
                      <span className="notification-time">5 hours ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-icon">📅</div>
                    <div className="notification-content">
                      <p className="notification-text">Upcoming stay: Cozy 2BR Retreat</p>
                      <span className="notification-time">1 day ago</span>
                    </div>
                  </div>
                </div>
                <a href="/notifications" className="view-all-link">View all notifications</a>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="profile-wrapper">
            <button
              className="profile-button"
              onClick={handleProfileClick}
              aria-label="User Profile"
            >
              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="profile-name">{userName}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="profile-info">
                    <div className="profile-avatar-large">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="profile-name-large">{userName}</p>
                      <p className="profile-email">rod@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="dropdown-menu">
                  <a href="/profile" className="dropdown-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    My Profile
                  </a>
                  <a href="/favorites" className="dropdown-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    Favorite Listings
                  </a>
                  <a href="/bookings" className="dropdown-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    My Bookings
                  </a>
                  <a href="/settings" className="dropdown-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M12 1v6m0 6v6m5.66-14.66l-4.24 4.24m0 5.66l4.24 4.24M23 12h-6m-6 0H1m14.66 5.66l-4.24-4.24m0-5.66l4.24-4.24"></path>
                    </svg>
                    Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="/logout" className="dropdown-item logout">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Log Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAuthenticated;
