/**
 * Utility functions for formatting listing data
 * Implements the 4 conditional logic rules from Bubble
 */

import type { KitchenType, BathroomDisplay } from '../types/listing.types';

/**
 * Bathroom display mapping based on Bubble option set
 */
const bathroomDisplayMap: Record<number, BathroomDisplay> = {
  1: '1 Bath',
  1.5: '1.5 Baths',
  2: '2 Baths',
  2.5: '2.5 Baths',
  3: '3 Baths',
  3.5: '3.5 Baths',
  4: '4 Baths',
  4.5: '4.5 Baths',
  5: '5 Baths',
  6: '6 Baths',
};

/**
 * Get bathroom display text from numeric value
 * @param count - Number of bathrooms (can be decimal for half baths)
 * @returns Formatted bathroom display text
 */
export const getBathroomDisplay = (count: number): BathroomDisplay => {
  return bathroomDisplayMap[count] || `${count} Baths`;
};

/**
 * Format bedroom and bathroom text according to Bubble's 4 conditional rules
 *
 * CONDITIONAL 1: When bedrooms = 1
 *   Display: "• 1 bedroom • [bathrooms] • [kitchen]"
 *
 * CONDITIONAL 2: When bathrooms = 0
 *   Display: "[bedrooms] bedrooms" (bedroom info only)
 *
 * CONDITIONAL 3: When bedrooms > 1
 *   Display: "• [bedrooms] bedrooms • [bathrooms] • [kitchen]"
 *
 * CONDITIONAL 4: When kitchen type is empty
 *   Display: "• [bedrooms] bedroom(s) • [bathrooms]" (no kitchen)
 *
 * @param bedrooms - Number of bedrooms
 * @param bathrooms - Number of bathrooms
 * @param kitchenType - Optional kitchen type
 * @returns Formatted display string
 */
export const formatBedroomBathroom = (
  bedrooms: number,
  bathrooms: number,
  kitchenType?: KitchenType
): string => {
  const parts: string[] = [];

  // CONDITIONAL 2: When bathrooms = 0, show only bedroom info
  if (bathrooms === 0) {
    if (bedrooms === 1) {
      return '1 bedroom';
    } else if (bedrooms > 1) {
      return `${bedrooms} bedrooms`;
    }
    return '';
  }

  // CONDITIONAL 1: When bedrooms = 1
  if (bedrooms === 1) {
    parts.push('1 bedroom');
  }
  // CONDITIONAL 3: When bedrooms > 1
  else if (bedrooms > 1) {
    parts.push(`${bedrooms} bedrooms`);
  }

  // Add bathroom information (if > 0)
  if (bathrooms > 0) {
    const bathroomDisplay = getBathroomDisplay(bathrooms);
    parts.push(bathroomDisplay);
  }

  // CONDITIONAL 4: Add kitchen type only if provided
  if (kitchenType && kitchenType !== '') {
    parts.push(kitchenType);
  }

  // Join parts with bullet separator
  return parts.length > 0 ? '• ' + parts.join(' • ') : '';
};

/**
 * Format price with currency symbol
 * @param price - Price amount
 * @param currency - Currency code (default: USD)
 * @returns Formatted price string (e.g., "$1,029/night")
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(price)}/night`;
};

/**
 * Format location display
 * @param borough - Borough name
 * @param hood - Neighborhood name
 * @param city - City name
 * @returns Formatted location string (e.g., "Brooklyn, Williamsburg, New York")
 */
export const formatLocation = (
  borough?: string,
  hood?: string,
  city?: string
): string => {
  const parts: string[] = [];

  if (borough) parts.push(borough);
  if (hood) parts.push(hood);
  if (city) parts.push(city);

  return parts.join(', ');
};

/**
 * Format date for display
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "Jan 15, 2024")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format availability range
 * @param firstAvailable - First available date
 * @param lastAvailable - Last available date
 * @returns Formatted availability string (e.g., "Available Jan 15 - Dec 31, 2024")
 */
export const formatAvailability = (
  firstAvailable: string,
  lastAvailable: string
): string => {
  if (!firstAvailable && !lastAvailable) return 'Availability not specified';

  const parts: string[] = ['Available'];

  if (firstAvailable) {
    parts.push(formatDate(firstAvailable));
  }

  if (lastAvailable) {
    parts.push('-', formatDate(lastAvailable));
  }

  return parts.join(' ');
};

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Get responsive image URL with imgix processing
 * @param imageUrl - Original image URL
 * @param width - Desired width
 * @param height - Desired height
 * @returns Processed image URL
 */
export const getProcessedImageUrl = (
  imageUrl: string,
  width?: number,
  height?: number
): string => {
  if (!imageUrl) return '';

  // If imgix is already in the URL, add parameters
  if (imageUrl.includes('imgix')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('fit', 'crop');
    params.append('auto', 'format,compress');

    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}${params.toString()}`;
  }

  return imageUrl;
};
