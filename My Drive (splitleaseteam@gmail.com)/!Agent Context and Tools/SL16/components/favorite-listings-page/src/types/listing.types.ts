/**
 * TypeScript type definitions for the Favorite Listings Page
 * Based on Bubble data schema with 50+ fields
 */

// Option Set Types
export type GenderPreference = 'No Preference' | 'Male' | 'Female' | 'Non-Binary';

export type KitchenType = 'Full Kitchen' | 'Kitchenette' | 'No Kitchen' | 'Shared Kitchen';

export type CheckInOutTime = '8:00 am' | '9:00 am' | '10:00 am' | '11:00 am' | '12:00 pm' | '1:00 pm' | '2:00 pm' | '3:00 pm' | '4:00 pm' | '5:00 pm' | '6:00 pm';

export interface BathroomOption {
  numeric: number;
  display: string;
}

export type BathroomDisplay = '1 Bath' | '1.5 Baths' | '2 Baths' | '2.5 Baths' | '3 Baths' | '3.5 Baths' | '4 Baths' | '4.5 Baths' | '5 Baths' | '6 Baths';

export type ParkingOption = 'Street Parking' | 'Private Parking' | 'Garage' | 'No Parking';

export type StorageOption = 'In-Unit Storage' | 'Building Storage' | 'No Storage';

export type ListingType = 'Entire Place' | 'Private Room' | 'Shared Room';

export type CancellationPolicy = 'Flexible' | 'Moderate' | 'Strict';

export type Borough = 'Manhattan' | 'Brooklyn' | 'Queens' | 'Bronx' | 'Staten Island';

export type City = 'New York' | 'Jersey City' | 'Hoboken';

// Core Data Types
export interface ListingPhoto {
  url: string;
  order: number;
  altText?: string;
}

export interface GeographicAddress {
  address: string;
  lat: number;
  lng: number;
  formatted?: string;
}

export interface PricingList {
  startingNightlyPrice: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  currency: string;
}

export interface ListingFeatures {
  qtyBedrooms: number;
  qtyBathrooms: number;
  qtyBeds: number;
  qtyGuests: number;
  sqftArea?: number;
  sqftOfRoom?: number;
  typeOfSpace: ListingType;
  amenitiesInUnit: string[];
  amenitiesInBuilding: string[];
  houseRules: string[];
  safetyFeatures: string[];
  parkingType?: ParkingOption;
  secureStorageOption?: StorageOption;
  trialPeriodsAllowed: boolean;
  photos: ListingPhoto[];
}

export interface ListingLocation {
  address: GeographicAddress;
  borough: Borough;
  city: City;
  hood: string;
  hoods?: string[];
  state: string;
  zipCode: string;
  slightlyDifferentAddress?: GeographicAddress;
}

export interface ListingAvailability {
  firstAvailable: string; // ISO date string
  lastAvailable: string; // ISO date string
  nightsAvailable: number;
  nightsAvailableList: number[];
  nightsNotAvailable: number[];
  datesBlocked: string[]; // ISO date strings
  confirmedAvailability: boolean;
}

export interface ListingCuration {
  id: string;
  name: string;
  active: boolean;
}

export interface AISuggestion {
  id: string;
  text: string;
  type: string;
}

export interface ImportantError {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface NearbySuggestion {
  id: string;
  name: string;
  distance: number;
  type: string;
}

/**
 * Main Listing interface - represents a single listing
 * Based on 50+ fields from the Bubble schema
 */
export interface Listing {
  // Core fields
  id: string;
  name: string;
  active: boolean;
  approved: boolean;
  complete: boolean;
  progress: 'address' | 'features' | 'photos' | 'pricing' | 'complete';

  // Search and ranking
  searchRanking: number;
  listingCode: string;
  bulkUploadId?: string;

  // Features
  features: ListingFeatures;
  kitchenType?: KitchenType;

  // Location
  location: ListingLocation;

  // Availability
  availability: ListingAvailability;
  maximumMonths?: number;

  // Pricing
  listerPriceDisplay: number;
  priceNumber?: string;
  priceSuggestion?: number[];
  pricingList: PricingList;

  // Preferences
  preferredGender: GenderPreference;
  allowAlternatingRoommates: boolean;

  // Check-in/out
  newDateCheckInTime: CheckInOutTime;
  newDateCheckOutTime: CheckInOutTime;

  // Cancellation
  cancellationPolicy: CancellationPolicy;
  cancelFeaturesEmailId?: string;

  // Metadata
  clickers?: string[]; // User IDs
  clicksToViewRatio?: number;
  profileEmbeddedImage?: string;

  // Maps
  mapHtmlMobile?: string;
  mapHtmlWeb?: string;

  // Curation
  listingCuration: ListingCuration[];

  // AI and suggestions
  aiSuggestionsList: AISuggestion[];
  nearbySuggestionsFromHost: NearbySuggestion[];
  nearbySuggestionsFromSplitLease: NearbySuggestion[];

  // Errors
  errors: ImportantError[];

  // Timestamps
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  // Favorites (for this page specifically)
  isFavorited: boolean;
}

/**
 * User interface - minimal fields needed for favorite listings page
 */
export interface User {
  id: string;
  email: string;
  favoritedListings: string[]; // Array of listing IDs
  quickMessage?: string;
  suggestedListing?: string; // Listing ID
}

/**
 * API Response types
 */
export interface PaginationMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface FavoritedListingsResponse {
  listings: Listing[];
  pagination: PaginationMeta;
}

export interface FavoriteToggleResponse {
  success: boolean;
  isFavorited: boolean;
  message?: string;
}

/**
 * Component Props types
 */
export interface ListingCardProps {
  listing: Listing;
  onToggleFavorite: (listingId: string) => void;
  onNavigateToDetail: (listingId: string) => void;
}

export interface EmptyStateProps {
  message: string;
  ctaText: string;
  ctaLink: string;
}

export interface FavoriteButtonProps {
  listingId: string;
  isFavorited: boolean;
  onToggle: (listingId: string) => void;
  disabled?: boolean;
}

/**
 * Utility type for bedroom/bathroom formatting
 */
export interface BedroomBathroomFormat {
  bedrooms: number;
  bathrooms: number;
  kitchenType?: KitchenType;
  formattedText: string;
}
