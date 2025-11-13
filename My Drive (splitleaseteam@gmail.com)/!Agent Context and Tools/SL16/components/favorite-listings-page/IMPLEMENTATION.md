# Implementation Guide

## Overview

This document provides detailed implementation notes for developers working on the Favorite Listings Page.

## Data Schema Implementation

### Listing Type (50+ Fields)

The `Listing` interface in `src/types/listing.types.ts` represents the complete data structure with all fields from Bubble:

```typescript
interface Listing {
  // Core identification
  id: string
  name: string
  active: boolean
  approved: boolean

  // Features (nested object)
  features: {
    qtyBedrooms: number
    qtyBathrooms: number
    photos: ListingPhoto[]
    // ... more fields
  }

  // Location (nested object)
  location: {
    address: GeographicAddress
    borough: Borough
    // ... more fields
  }

  // Pricing
  pricingList: PricingList

  // ... 40+ more fields
}
```

## Conditional Logic: Bedroom/Bathroom Formatting

The most critical logic is the bedroom/bathroom text formatting with **4 conditional rules**:

### Rule 1: When bedrooms = 1
```typescript
if (bedrooms === 1) {
  return "• 1 bedroom • [bathrooms] • [kitchen]"
}
```

### Rule 2: When bathrooms = 0
```typescript
if (bathrooms === 0) {
  return "[bedrooms] bedroom(s)" // Only bedroom info
}
```

### Rule 3: When bedrooms > 1
```typescript
if (bedrooms > 1) {
  return "• [bedrooms] bedrooms • [bathrooms] • [kitchen]"
}
```

### Rule 4: When kitchen type is empty
```typescript
if (!kitchenType) {
  return "• [bedrooms] bedroom(s) • [bathrooms]" // No kitchen
}
```

**Implementation Location**: `src/utils/formatters.ts` → `formatBedroomBathroom()`

### Testing the Logic

```typescript
// Test cases
formatBedroomBathroom(1, 1, 'Full Kitchen')
// Output: "• 1 bedroom • 1 Bath • Full Kitchen"

formatBedroomBathroom(2, 0, 'Full Kitchen')
// Output: "2 bedrooms"

formatBedroomBathroom(3, 2, 'Full Kitchen')
// Output: "• 3 bedrooms • 2 Baths • Full Kitchen"

formatBedroomBathroom(2, 1.5, undefined)
// Output: "• 2 bedrooms • 1.5 Baths"
```

## API Integration

### Bubble API Structure

Bubble uses a specific API structure that needs transformation:

**Bubble Response Format:**
```json
{
  "response": {
    "results": [
      {
        "_id": "1234567890",
        "Name": "Listing Name",
        "Features - Qty Bedrooms": 2,
        "Features - Qty Bathrooms": 1,
        "Location - Borough": "Brooklyn"
      }
    ],
    "count": 10
  }
}
```

**Our Format:**
```typescript
{
  listings: [
    {
      id: "1234567890",
      name: "Listing Name",
      features: {
        qtyBedrooms: 2,
        qtyBathrooms: 1
      },
      location: {
        borough: "Brooklyn"
      }
    }
  ],
  pagination: {
    total: 10,
    page: 1,
    perPage: 20
  }
}
```

**Transformation happens in**: `src/services/api.ts` → `getFavoritedListings()`

### API Authentication

All API calls include:
```typescript
headers: {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
}
```

Token is stored in `.env` file as `VITE_BUBBLE_API_TOKEN`.

## State Management

### Page State
```typescript
const [listings, setListings] = useState<Listing[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [page, setPage] = useState(1)
const [hasMore, setHasMore] = useState(false)
```

### Optimistic Updates

When removing a favorite:

1. **Immediately update UI** - Remove from list
2. **Call API** - Request backend update
3. **On error** - Rollback and restore item
4. **On success** - Keep UI as-is

```typescript
const handleToggleFavorite = async (listingId: string) => {
  const listing = listings.find(l => l.id === listingId)

  // Optimistic update
  setListings(prev => prev.filter(l => l.id !== listingId))

  try {
    await bubbleApi.removeFromFavorites(userId, listingId)
  } catch (error) {
    // Rollback on error
    setListings(prev => [...prev, listing])
    alert('Failed to remove from favorites')
  }
}
```

## Responsive Design

### Breakpoint: 900px

All responsive styles use this breakpoint:

```css
@media (max-width: 900px) {
  /* Mobile styles */
}
```

### Key Changes at Mobile

**Desktop (≥ 900px):**
- Card height: 200px minimum
- Layout: Row (photo left, details right)
- Photo width: 300px fixed

**Mobile (< 900px):**
- Card height: 550px minimum
- Layout: Column (photo top, details bottom)
- Photo width: 100%
- Photo height: 250px

## Component Architecture

### Component Tree
```
App
└── FavoriteListingsPage
    ├── ListingCard (repeating)
    │   ├── Photo Container
    │   │   ├── Image
    │   │   ├── Photo Navigation
    │   │   └── FavoriteButton
    │   └── Details Container
    │       ├── Location & Price
    │       ├── Name
    │       ├── Features (bedroom/bathroom)
    │       └── Additional Info
    └── EmptyState (conditional)
```

### Component Props Flow

```typescript
// Page → Card
<ListingCard
  listing={listing}
  onToggleFavorite={handleToggleFavorite}
  onNavigateToDetail={handleNavigateToDetail}
/>

// Card → FavoriteButton
<FavoriteButton
  listingId={listing.id}
  isFavorited={listing.isFavorited}
  onToggle={onToggleFavorite}
/>
```

## Workflows Mapping

### Bubble Workflow → React Implementation

| Bubble Workflow | React Implementation | Location |
|-----------------|---------------------|----------|
| Page is Loaded | `useEffect(() => {})` | FavoriteListingsPage.tsx:27 |
| Toggle Favorite | `handleToggleFavorite()` | FavoriteListingsPage.tsx:65 |
| Go to Listing | `handleNavigateToDetail()` | FavoriteListingsPage.tsx:93 |
| Photo Next | `handleNextPhoto()` | ListingCard.tsx:24 |
| Photo Previous | `handlePreviousPhoto()` | ListingCard.tsx:18 |
| Refresh Listings | `handleRefresh()` | FavoriteListingsPage.tsx:104 |

## Performance Optimizations

### Image Loading
- Lazy loading with imgix processing
- Responsive image sizes
- Placeholder for loading state
- Error handling for failed loads

### API Calls
- Debouncing on favorite toggle
- Caching with axios interceptors
- Pagination to limit data transfer
- Optimistic UI updates

### Rendering
- React.memo for components (future)
- Key prop on list items
- Avoid unnecessary re-renders
- CSS animations over JavaScript

## Error Handling

### Network Errors
```typescript
try {
  const response = await bubbleApi.getFavoritedListings()
  setListings(response.listings)
} catch (error) {
  console.error('Error:', error)
  setError('Failed to load listings')
}
```

### User-Facing Errors
- Loading states with spinners
- Error messages with retry buttons
- Graceful fallbacks
- Console logging for debugging

## Testing Strategy

### Unit Tests (Future)
- Formatter functions
- API transformations
- Component rendering
- State management

### Integration Tests (Future)
- Page load flow
- Favorite toggle flow
- Navigation flow
- Error scenarios

### E2E Tests (Future)
- Complete user journey
- Cross-browser testing
- Mobile device testing
- Performance benchmarks

## Security Considerations

### API Security
- Token stored in environment variables
- HTTPS only for API calls
- No sensitive data in client-side code
- CORS configuration required

### User Data
- User ID from authentication (mock for now)
- No passwords or sensitive info stored
- Data validation on all inputs
- XSS prevention with React escaping

## Deployment Checklist

- [ ] Build production bundle
- [ ] Set environment variables
- [ ] Test on staging environment
- [ ] Configure CORS in Bubble
- [ ] Enable API endpoints in Bubble
- [ ] Test all workflows
- [ ] Monitor error logs
- [ ] Set up analytics

## Troubleshooting

### Common Issues

**Issue**: API calls failing with 401
**Solution**: Check API token in `.env` file

**Issue**: Images not loading
**Solution**: Verify imgix configuration and CORS

**Issue**: Responsive layout broken
**Solution**: Check media query breakpoint at 900px

**Issue**: Favorite toggle not working
**Solution**: Verify workflow endpoints are enabled in Bubble

## Future Improvements

1. **Authentication System**
   - Replace mock user ID with real auth
   - JWT token management
   - Protected routes

2. **Search & Filters**
   - Location filter
   - Price range filter
   - Bedroom/bathroom filter
   - Date availability filter

3. **Performance**
   - Implement virtual scrolling
   - Add service worker for offline
   - Optimize bundle size
   - Add CDN for assets

4. **Testing**
   - Add Jest unit tests
   - Add Cypress E2E tests
   - Visual regression testing
   - Performance testing

5. **Accessibility**
   - ARIA labels everywhere
   - Keyboard navigation
   - Screen reader support
   - WCAG 2.1 AAA compliance

---

**Last Updated**: December 2024
