/**
 * API Service Layer for Bubble Backend Integration
 * Handles all API calls to Bubble's Workflow API and Data API
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  Listing,
  FavoritedListingsResponse,
  FavoriteToggleResponse
} from '../types/listing.types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_BUBBLE_API_BASE_URL || 'https://app.split.lease/version-test/api/1.1';
const WF_API_URL = import.meta.env.VITE_BUBBLE_WF_API_URL || `${API_BASE_URL}/wf`;
const DATA_API_URL = import.meta.env.VITE_BUBBLE_DATA_API_URL || `${API_BASE_URL}/obj`;
const API_TOKEN = import.meta.env.VITE_BUBBLE_API_TOKEN || '';

/**
 * Create axios instance with default configuration
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    timeout: 10000, // 10 second timeout
  });

  // Request interceptor for logging
  client.interceptors.request.use(
    (config) => {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('[API Request Error]', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => {
      console.log(`[API Response] ${response.config.url} - Status: ${response.status}`);
      return response;
    },
    (error: AxiosError) => {
      console.error('[API Response Error]', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createApiClient();

/**
 * API Service object with all endpoint methods
 */
export const bubbleApi = {
  /**
   * Get favorited listings for the current user
   * @param userId - The current user's ID
   * @param params - Optional query parameters (page, perPage, sortBy)
   * @returns Promise with favorited listings and pagination data
   */
  getFavoritedListings: async (
    userId: string,
    params: {
      page?: number;
      perPage?: number;
      sortBy?: string;
    } = {}
  ): Promise<FavoritedListingsResponse> => {
    try {
      const { page = 1, perPage = 20, sortBy = 'price_asc' } = params;

      // Build constraints for Bubble API
      // Filter: listings that are in user's favorited list, active, and approved
      const constraints = JSON.stringify([
        {
          key: 'favorited_by',
          constraint_type: 'contains',
          value: userId,
        },
        {
          key: 'Active',
          constraint_type: 'equals',
          value: true,
        },
        {
          key: 'Approved',
          constraint_type: 'equals',
          value: true,
        },
      ]);

      // Determine sort field based on sortBy parameter
      let sortField = 'lister_price_display';
      let sortDescending = false;

      if (sortBy === 'price_desc') {
        sortDescending = true;
      }

      const response = await apiClient.get(`${DATA_API_URL}/listing`, {
        params: {
          constraints,
          sort_field: sortField,
          descending: sortDescending,
          cursor: (page - 1) * perPage,
          limit: perPage,
        },
      });

      // Transform Bubble response to our format
      const listings: Listing[] = response.data.response.results.map((item: any) => ({
        id: item._id,
        name: item.Name || '',
        active: item.Active ?? true,
        approved: item.Approved ?? false,
        complete: item.Complete ?? false,
        progress: item.progress || 'address',
        searchRanking: item['Search Ranking'] || 0,
        listingCode: item['Listing Code OP'] || '',
        features: {
          qtyBedrooms: item['Features - Qty Bedrooms'] || 0,
          qtyBathrooms: item['Features - Qty Bathrooms'] || 0,
          qtyBeds: item['Features - Qty Beds'] || 0,
          qtyGuests: item['Features - Qty Guests'] || 0,
          sqftArea: item['Features - SQFT Area'],
          sqftOfRoom: item['Features - SQFT of Room'],
          typeOfSpace: item['Features - Type of Space'],
          amenitiesInUnit: item['Features - Amenities In-Unit'] || [],
          amenitiesInBuilding: item['Features - Amenities In-Building'] || [],
          houseRules: item['Features - House Rules'] || [],
          safetyFeatures: item['Features - Safety'] || [],
          parkingType: item['Features - Parking type'],
          secureStorageOption: item['Features - Secure Storage Option'],
          trialPeriodsAllowed: item['Features - Trial Periods Allowed'] ?? true,
          photos: (item['Features - Photos'] || []).map((photo: any, index: number) => ({
            url: photo.url || photo,
            order: index,
            altText: item.Name,
          })),
        },
        kitchenType: item['Kitchen Type'],
        location: {
          address: {
            address: item['Location - Address']?.address || '',
            lat: item['Location - Address']?.lat || 0,
            lng: item['Location - Address']?.lng || 0,
          },
          borough: item['Location - Borough'],
          city: item['Location - City'],
          hood: item['Location - Hood'],
          hoods: item['Location - Hoods (new)'] || [],
          state: item['Location - State'] || 'NY',
          zipCode: item['Location - Zip Code'] || '',
        },
        availability: {
          firstAvailable: item['First Available'] || '',
          lastAvailable: item['Last Available'] || '',
          nightsAvailable: item['# of nights available'] || 7,
          nightsAvailableList: item['Nights Available (numbers)'] || [],
          nightsNotAvailable: item['Nights Not Available'] || [],
          datesBlocked: item['Dates - Blocked'] || [],
          confirmedAvailability: item.confirmedAvailability ?? false,
        },
        listerPriceDisplay: item['Lister Price Display'] || 0,
        priceNumber: item['Price number (for map)'],
        pricingList: {
          startingNightlyPrice: item.pricing_list?.['Starting Nightly Price'] || item['Lister Price Display'] || 0,
          weeklyPrice: item.pricing_list?.['Weekly Price'],
          monthlyPrice: item.pricing_list?.['Monthly Price'],
          currency: 'USD',
        },
        preferredGender: item['Preferred Gender'] || 'No Preference',
        allowAlternatingRoommates: item['allow alternating roommates?'] ?? true,
        newDateCheckInTime: item['NEW Date Check-in Time'] || '2:00 pm',
        newDateCheckOutTime: item['NEW Date Check-out Time'] || '11:00 am',
        cancellationPolicy: item['Cancellation Policy'] || 'Flexible',
        maximumMonths: item['Maximum Months'],
        clickers: item.Clickers || [],
        clicksToViewRatio: item.ClicksToViewRatio,
        profileEmbeddedImage: item['Profile Embedded Image'],
        mapHtmlMobile: item['Map HTML Mobile'],
        mapHtmlWeb: item['Map HTML Web'],
        listingCuration: item['Listing Curation'] || [],
        aiSuggestionsList: item['AI Suggestions List'] || [],
        nearbySuggestionsFromHost: item['Nearby Suggestions from Host'] || [],
        nearbySuggestionsFromSplitLease: item['Nearby Suggestions from SplitLease'] || [],
        errors: item.Errors || [],
        createdAt: item.Created || new Date().toISOString(),
        updatedAt: item.Modified || new Date().toISOString(),
        isFavorited: true, // All listings from this endpoint are favorited
      }));

      return {
        listings,
        pagination: {
          total: response.data.response.count || listings.length,
          page,
          perPage,
          totalPages: Math.ceil((response.data.response.count || listings.length) / perPage),
        },
      };
    } catch (error) {
      console.error('Error fetching favorited listings:', error);
      throw error;
    }
  },

  /**
   * Add a listing to user's favorites
   * @param userId - The current user's ID
   * @param listingId - The listing ID to favorite
   * @returns Promise with success status
   */
  addToFavorites: async (
    userId: string,
    listingId: string
  ): Promise<FavoriteToggleResponse> => {
    try {
      // This would typically be a backend workflow in Bubble
      const response = await apiClient.post(`${WF_API_URL}/add-to-favorites`, {
        userId,
        listingId,
      });

      return {
        success: true,
        isFavorited: true,
        message: 'Listing added to favorites',
      };
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  /**
   * Remove a listing from user's favorites
   * @param userId - The current user's ID
   * @param listingId - The listing ID to unfavorite
   * @returns Promise with success status
   */
  removeFromFavorites: async (
    userId: string,
    listingId: string
  ): Promise<FavoriteToggleResponse> => {
    try {
      // This would typically be a backend workflow in Bubble
      const response = await apiClient.post(`${WF_API_URL}/remove-from-favorites`, {
        userId,
        listingId,
      });

      return {
        success: true,
        isFavorited: false,
        message: 'Listing removed from favorites',
      };
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  },

  /**
   * Get favorite status for a specific listing
   * @param userId - The current user's ID
   * @param listingId - The listing ID to check
   * @returns Promise with favorite status
   */
  getFavoriteStatus: async (
    userId: string,
    listingId: string
  ): Promise<{ isFavorited: boolean }> => {
    try {
      const response = await apiClient.get(`${DATA_API_URL}/user/${userId}`, {
        params: {
          // This would check if listingId is in user's favorited_listings field
        },
      });

      const favoritedListings = response.data.response['Favorited Listings'] || [];
      const isFavorited = favoritedListings.includes(listingId);

      return { isFavorited };
    } catch (error) {
      console.error('Error checking favorite status:', error);
      throw error;
    }
  },

  /**
   * Subscribe user to new listing email notifications
   * @param email - User's email address
   * @param userId - User's ID
   * @returns Promise with success status
   */
  subscribeToNewListings: async (
    email: string,
    userId: string
  ): Promise<{ success: boolean }> => {
    try {
      await apiClient.post(`${WF_API_URL}/subscribe-new-listings`, {
        email,
        userId,
      });

      return { success: true };
    } catch (error) {
      console.error('Error subscribing to new listings:', error);
      throw error;
    }
  },
};

export default bubbleApi;
