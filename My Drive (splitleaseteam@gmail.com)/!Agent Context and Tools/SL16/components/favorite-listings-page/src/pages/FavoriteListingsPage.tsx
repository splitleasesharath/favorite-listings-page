/**
 * FavoriteListingsPage Component
 * Main page component that displays user's favorited listings
 * Implements page load workflow and all interaction handlers
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Listing } from '../types/listing.types';
import ListingCard from '../components/ListingCard';
import EmptyState from '../components/EmptyState';
import { bubbleApi } from '../services/api';
import '../styles/FavoriteListingsPage.css';

// Mock user ID - in production, this would come from authentication context
const CURRENT_USER_ID = 'current-user-id';

const FavoriteListingsPage: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  /**
   * WORKFLOW: Page is Loaded
   * Triggered when page first loads
   * Steps:
   * 1. Initialize user session
   * 2. Load user preferences
   * 3. Fetch initial listing data
   * 4. Apply default filters
   * 5. Render UI components
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
        setHasMore(response.pagination.page < response.pagination.totalPages);

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
   * WORKFLOW: Toggle Favorite (Remove from favorites)
   * Triggered when user clicks heart icon on a favorited listing
   * Steps:
   * 1. Optimistically update UI (remove from list)
   * 2. Call API to remove from favorites
   * 3. On error, rollback and show error message
   */
  const handleToggleFavorite = async (listingId: string) => {
    // Find the listing
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    // Optimistic update - remove from list immediately
    setListings((prevListings) => prevListings.filter((l) => l.id !== listingId));

    try {
      // Call API to remove from favorites
      await bubbleApi.removeFromFavorites(CURRENT_USER_ID, listingId);

      console.log(`Removed listing ${listingId} from favorites`);
    } catch (err) {
      console.error('Error removing from favorites:', err);

      // Rollback on error - add listing back
      setListings((prevListings) => [...prevListings, listing]);

      // Show error message
      alert('Failed to remove from favorites. Please try again.');
    }
  };

  /**
   * WORKFLOW: Go to Listing (listing card) is clicked
   * Triggered when user clicks on a listing card
   * Steps:
   * 1. Navigate to listing detail page
   * 2. Pass listing ID as URL parameter
   */
  const handleNavigateToDetail = (listingId: string) => {
    navigate(`/listing/${listingId}`);
  };

  /**
   * WORKFLOW: Get newest listings is clicked
   * Triggered when user wants to refresh the list
   */
  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await bubbleApi.getFavoritedListings(CURRENT_USER_ID, {
        page: 1,
        perPage: 20,
        sortBy: 'price_asc',
      });

      setListings(response.listings);
      setPage(1);
      setHasMore(response.pagination.page < response.pagination.totalPages);

      console.log('Refreshed listings');
    } catch (err) {
      console.error('Error refreshing listings:', err);
      setError('Failed to refresh listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load more listings (pagination)
   */
  const handleLoadMore = async () => {
    try {
      const nextPage = page + 1;

      const response = await bubbleApi.getFavoritedListings(CURRENT_USER_ID, {
        page: nextPage,
        perPage: 20,
        sortBy: 'price_asc',
      });

      setListings((prevListings) => [...prevListings, ...response.listings]);
      setPage(nextPage);
      setHasMore(response.pagination.page < response.pagination.totalPages);
    } catch (err) {
      console.error('Error loading more listings:', err);
    }
  };

  // Loading state
  if (loading && listings.length === 0) {
    return (
      <div className="favorite-listings-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your favorite listings...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && listings.length === 0) {
    return (
      <div className="favorite-listings-page">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state - no favorite listings
  if (listings.length === 0) {
    return (
      <div className="favorite-listings-page">
        <EmptyState
          message="You don't have any favorite listings yet. We invite you to search listings and submit proposals with the weekly schedule you have in mind"
          ctaText="Explore Rentals"
          ctaLink="/search"
        />
      </div>
    );
  }

  // Main content - display listings
  return (
    <div className="favorite-listings-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Your Favorite Listings</h1>
        <button className="refresh-button" onClick={handleRefresh}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Refresh
        </button>
      </div>

      {/* Listings Grid */}
      <div className="listings-container">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToDetail={handleNavigateToDetail}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More Listings
          </button>
        </div>
      )}

      {/* No more listings message */}
      {!hasMore && listings.length > 0 && (
        <div className="end-of-list">
          <p>You've reached the end of your favorites</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteListingsPage;
