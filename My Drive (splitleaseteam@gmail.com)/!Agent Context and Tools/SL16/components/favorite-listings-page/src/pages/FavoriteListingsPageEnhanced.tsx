/**
 * FavoriteListingsPage Enhanced Component
 * Main page with Header, Footer, Map, and Filter section
 * Includes dynamic pricing based on date selection
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Listing } from '../types/listing.types';
import type { DateRange } from '../components/FilterSection';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import ListingCard from '../components/ListingCard';
import EmptyState from '../components/EmptyState';
import MapView from '../components/MapView';
import FilterSection from '../components/FilterSection';
import { bubbleApi } from '../services/api';
import '../styles/FavoriteListingsPage.css';

// Mock user ID - in production, this would come from authentication context
const CURRENT_USER_ID = 'current-user-id';

const FavoriteListingsPageEnhanced: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [listings, setListings] = useState<Listing[]>([]);
  const [displayedListings, setDisplayedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [selectedListingId, setSelectedListingId] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<DateRange>({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    nights: 1
  });

  /**
   * Calculate dynamic pricing based on number of nights
   */
  const calculateDynamicPrice = (basePrice: number, nights: number): number => {
    // Price calculation logic:
    // - 1-6 nights: nightly rate
    // - 7-29 nights: 10% discount
    // - 30+ nights: 20% discount
    if (nights >= 30) {
      return Math.floor(basePrice * 0.8); // 20% discount
    } else if (nights >= 7) {
      return Math.floor(basePrice * 0.9); // 10% discount
    }
    return basePrice;
  };

  /**
   * Update listings with dynamic pricing when date range changes
   */
  useEffect(() => {
    if (listings.length > 0) {
      const updatedListings = listings.map(listing => ({
        ...listing,
        pricingList: {
          ...listing.pricingList,
          startingNightlyPrice: calculateDynamicPrice(
            listing.listerPriceDisplay,
            dateRange.nights
          )
        }
      }));
      setDisplayedListings(updatedListings);
    }
  }, [listings, dateRange]);

  /**
   * WORKFLOW: Page is Loaded
   */
  useEffect(() => {
    const initializePage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch favorited listings
        const response = await bubbleApi.getFavoritedListings(CURRENT_USER_ID, {
          page: 1,
          perPage: 20,
          sortBy: 'price_asc',
        });

        setListings(response.listings);
        setDisplayedListings(response.listings);

        console.log(`Loaded ${response.listings.length} favorite listings`);
      } catch (err) {
        console.error('Error initializing page:', err);
        setError('Failed to load your favorite listings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, []);

  /**
   * Handle date range change from filter section
   */
  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
  };

  /**
   * Toggle favorite (remove from favorites)
   */
  const handleToggleFavorite = async (listingId: string) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    // Optimistic update
    setListings((prev) => prev.filter((l) => l.id !== listingId));
    setDisplayedListings((prev) => prev.filter((l) => l.id !== listingId));

    try {
      await bubbleApi.removeFromFavorites(CURRENT_USER_ID, listingId);
      console.log(`Removed listing ${listingId} from favorites`);
    } catch (err) {
      console.error('Error removing from favorites:', err);
      setListings((prev) => [...prev, listing]);
      setDisplayedListings((prev) => [...prev, listing]);
      alert('Failed to remove from favorites. Please try again.');
    }
  };

  /**
   * Navigate to listing detail
   */
  const handleNavigateToDetail = (listingId: string) => {
    navigate(`/listing/${listingId}`);
  };

  /**
   * Handle listing selection from map
   */
  const handleMapListingClick = (listingId: string) => {
    setSelectedListingId(listingId);
    // Scroll to the listing card
    const element = document.getElementById(`listing-${listingId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  /**
   * Toggle map view
   */
  const handleToggleMap = () => {
    setShowMap(!showMap);
  };

  // Loading state
  if (loading && listings.length === 0) {
    return (
      <div className="page-with-header-footer">
        <Header />
        <div className="main-content-with-header">
          <div className="favorite-listings-page">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your favorite listings...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error && listings.length === 0) {
    return (
      <div className="page-with-header-footer">
        <Header />
        <div className="main-content-with-header">
          <div className="favorite-listings-page">
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="retry-button" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Empty state
  if (displayedListings.length === 0) {
    return (
      <div className="page-with-header-footer">
        <Header />
        <div className="main-content-with-header">
          <div className="favorite-listings-page">
            <EmptyState
              message="You don't have any favorite listings yet. We invite you to search listings and submit proposals with the weekly schedule you have in mind"
              ctaText="Explore Rentals"
              ctaLink="https://app.split.lease/search"
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Main content with listings
  return (
    <div className="page-with-header-footer">
      <Header />

      <div className="main-content-with-header">
        <div className="favorite-listings-page-enhanced">
          {/* Page Header */}
          <div className="page-header-enhanced">
            <div>
              <h1 className="page-title">Your Favorite Listings</h1>
              <p className="page-subtitle">{displayedListings.length} properties saved</p>
            </div>
            <button className="toggle-map-btn" onClick={handleToggleMap}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>

          {/* Filter Section */}
          <FilterSection
            onDateRangeChange={handleDateRangeChange}
            initialCheckIn={dateRange.checkIn}
            initialCheckOut={dateRange.checkOut}
          />

          {/* Map View */}
          {showMap && (
            <div className="map-section">
              <MapView
                listings={displayedListings}
                onListingClick={handleMapListingClick}
                selectedListingId={selectedListingId}
              />
            </div>
          )}

          {/* Listings Grid */}
          <div className="listings-section">
            <h2 className="listings-section-title">All Favorites</h2>
            <div className="listings-container">
              {displayedListings.map((listing) => (
                <div
                  key={listing.id}
                  id={`listing-${listing.id}`}
                  className={selectedListingId === listing.id ? 'listing-highlighted' : ''}
                >
                  <ListingCard
                    listing={listing}
                    onToggleFavorite={handleToggleFavorite}
                    onNavigateToDetail={handleNavigateToDetail}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Info Note */}
          <div className="pricing-info-note">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>
              <strong>Dynamic Pricing:</strong> Prices adjust based on your selected dates.
              Longer stays (7+ nights) receive discounts up to 20% off.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FavoriteListingsPageEnhanced;
