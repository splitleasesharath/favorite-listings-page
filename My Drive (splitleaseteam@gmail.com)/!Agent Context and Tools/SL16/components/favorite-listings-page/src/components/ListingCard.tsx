/**
 * ListingCard Component
 * Displays a single listing card with photo, details, and favorite button
 * Implements all conditional logic from Bubble design
 */

import { useState } from 'react';
import type { ListingCardProps } from '../types/listing.types';
import FavoriteButton from './FavoriteButton';
import {
  formatBedroomBathroom,
  formatPrice,
  formatLocation,
  getProcessedImageUrl,
} from '../utils/formatters';
import '../styles/ListingCard.css';

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onToggleFavorite,
  onNavigateToDetail,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const photos = listing.features.photos;
  const hasMultiplePhotos = photos.length > 1;

  const handlePreviousPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageIndex < photos.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const handleCardClick = () => {
    onNavigateToDetail(listing.id);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Get formatted text using the 4 conditional rules
  const bedroomBathroomText = formatBedroomBathroom(
    listing.features.qtyBedrooms,
    listing.features.qtyBathrooms,
    listing.kitchenType
  );

  const locationText = formatLocation(
    listing.location.borough,
    listing.location.hood,
    listing.location.city
  );

  const priceText = formatPrice(listing.pricingList.startingNightlyPrice);

  // Get main photo URL
  const mainPhotoUrl = photos.length > 0
    ? getProcessedImageUrl(photos[imageIndex].url, 400, 300)
    : '';

  return (
    <div className="listing-card" onClick={handleCardClick}>
      {/* Photo Section */}
      <div className="listing-photo-container">
        {!imageError && mainPhotoUrl ? (
          <img
            src={mainPhotoUrl}
            alt={listing.name}
            className="listing-photo"
            onError={handleImageError}
          />
        ) : (
          <div className="listing-photo-placeholder">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}

        {/* Photo Navigation Arrows */}
        {hasMultiplePhotos && (
          <div className="photo-navigation">
            <button
              className={`photo-nav-button prev ${imageIndex === 0 ? 'disabled' : ''}`}
              onClick={handlePreviousPhoto}
              disabled={imageIndex === 0}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              className={`photo-nav-button next ${imageIndex === photos.length - 1 ? 'disabled' : ''}`}
              onClick={handleNextPhoto}
              disabled={imageIndex === photos.length - 1}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        )}

        {/* Photo Counter */}
        {hasMultiplePhotos && (
          <div className="photo-counter">
            {imageIndex + 1} / {photos.length}
          </div>
        )}

        {/* Favorite Button */}
        <div className="favorite-button-container">
          <FavoriteButton
            listingId={listing.id}
            isFavorited={listing.isFavorited}
            onToggle={onToggleFavorite}
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="listing-details">
        {/* Location and Price Row */}
        <div className="listing-header">
          <div className="listing-location">
            {locationText}
          </div>
          <div className="listing-price">
            {priceText}
          </div>
        </div>

        {/* Listing Name */}
        <h3 className="listing-name">
          {listing.name}
        </h3>

        {/* Bedroom/Bathroom/Kitchen Info */}
        {bedroomBathroomText && (
          <div className="listing-features">
            {bedroomBathroomText}
          </div>
        )}

        {/* Type of Space */}
        {listing.features.typeOfSpace && (
          <div className="listing-type">
            {listing.features.typeOfSpace}
          </div>
        )}

        {/* Additional Features (SQFT if available) */}
        {listing.features.sqftArea && (
          <div className="listing-sqft">
            {listing.features.sqftArea} sq ft
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
