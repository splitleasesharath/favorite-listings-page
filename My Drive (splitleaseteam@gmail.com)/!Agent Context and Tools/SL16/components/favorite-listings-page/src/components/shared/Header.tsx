/**
 * Header Component
 * Reusable header from index-header repository
 */

import { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<{host: boolean, guest: boolean}>({
    host: false,
    guest: false
  });

  const toggleDropdown = (type: 'host' | 'guest') => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const closeAllDropdowns = () => {
    setIsDropdownOpen({ host: false, guest: false });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.nav-dropdown')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const openAuthModal = () => {
    window.location.href = 'https://app.split.lease/signup-login';
  };

  return (
    <header className="main-header">
      <nav className="nav-container">
        <div className="nav-left">
          <a href="https://splitlease.app" className="logo">
            <span className="logo-text">Split Lease</span>
          </a>
        </div>

        <div className="nav-center">
          <div className="nav-dropdown">
            <a
              href="#host"
              className="nav-link dropdown-trigger"
              onClick={(e) => { e.preventDefault(); toggleDropdown('host'); }}
            >
              <span className="mobile-text">Host</span>
              <span className="desktop-text">Host with Us</span>
              <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            {isDropdownOpen.host && (
              <div className="dropdown-menu">
                <a href="https://app.split.lease/host-step-by-step-guide-to-list" className="dropdown-item">
                  <span className="dropdown-title">Why List with Us</span>
                  <span className="dropdown-desc">New to Split Lease? Learn more about hosting</span>
                </a>
                <a href="https://app.split.lease/success-stories-guest" className="dropdown-item">
                  <span className="dropdown-title">Success Stories</span>
                  <span className="dropdown-desc">Explore other hosts' feedback</span>
                </a>
                <a href="https://app.split.lease/signup-login" className="dropdown-item">
                  <span className="dropdown-title">List Property</span>
                </a>
                <a href="https://app.split.lease/policies/cancellation-and-refund-policy" className="dropdown-item">
                  <span className="dropdown-title">Legal Information</span>
                  <span className="dropdown-desc">Review most important policies</span>
                </a>
                <a href="https://app.split.lease/faq" className="dropdown-item">
                  <span className="dropdown-title">FAQs</span>
                  <span className="dropdown-desc">Frequently Asked Questions</span>
                </a>
              </div>
            )}
          </div>

          <div className="nav-dropdown">
            <a
              href="#stay"
              className="nav-link dropdown-trigger"
              onClick={(e) => { e.preventDefault(); toggleDropdown('guest'); }}
            >
              <span className="mobile-text">Guest</span>
              <span className="desktop-text">Stay with Us</span>
              <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            {isDropdownOpen.guest && (
              <div className="dropdown-menu">
                <a href="https://app.split.lease/search" className="dropdown-item">
                  <span className="dropdown-title">Explore Rentals</span>
                  <span className="dropdown-desc">See available listings!</span>
                </a>
                <a href="https://app.split.lease/success-stories-guest" className="dropdown-item">
                  <span className="dropdown-title">Success Stories</span>
                  <span className="dropdown-desc">Explore other guests' feedback</span>
                </a>
                <a href="https://app.split.lease/faq" className="dropdown-item">
                  <span className="dropdown-title">FAQs</span>
                  <span className="dropdown-desc">Frequently Asked Questions</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="nav-right">
          <a href="https://app.split.lease/search" className="explore-rentals-btn">Explore Rentals</a>
          <a href="javascript:void(0)" className="nav-link" onClick={openAuthModal}>Sign In</a>
          <span className="divider">|</span>
          <a href="javascript:void(0)" className="nav-link" onClick={openAuthModal}>Sign Up</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
