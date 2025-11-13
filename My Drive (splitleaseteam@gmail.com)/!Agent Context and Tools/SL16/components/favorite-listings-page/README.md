# Favorite Listings Page - Split Lease

A code-based implementation of the Split Lease "Favorite Listings" page, migrated from Bubble.io to a modern React + TypeScript application.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Components](#components)
- [API Integration](#api-integration)
- [Styling & Responsive Design](#styling--responsive-design)
- [Workflows Implemented](#workflows-implemented)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Overview

This project replicates the "favorite-listings" page from the Split Lease Bubble application as a standalone React application. It implements all 46 workflows, conditional logic, responsive design, and data integrations from the original Bubble page.

**Key Implementation Details:**
- 50+ field data schema
- 4 conditional bedroom/bathroom formatting rules
- Responsive breakpoint at 900px
- Bubble API integration via REST endpoints
- Optimistic UI updates for favorite toggles
- Photo carousel navigation
- Empty state handling

## ✨ Features

- **Favorite Listings Display**: View all listings favorited by the current user
- **Interactive Cards**: Click cards to navigate to listing details
- **Favorite Toggle**: Heart icon to add/remove favorites with optimistic updates
- **Photo Carousel**: Navigate through multiple listing photos
- **Empty State**: Friendly message and CTA when no favorites exist
- **Responsive Design**: Mobile-optimized (< 900px) and desktop layouts
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: Graceful error messages with retry options
- **Pagination**: Load more listings on demand
- **Price Display**: Formatted currency with nightly rates
- **Location Display**: Borough, neighborhood, and city information

## 🛠 Tech Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript 5.2
- **Build Tool**: Vite 5.0
- **Routing**: React Router DOM 6.20
- **HTTP Client**: Axios 1.6
- **Styling**: CSS3 with CSS Modules pattern
- **Fonts**: Lato (Google Fonts)

## 📁 Project Structure

```
favorite-listings-page/
├── src/
│   ├── components/          # React components
│   │   ├── FavoriteButton.tsx
│   │   ├── EmptyState.tsx
│   │   └── ListingCard.tsx
│   ├── pages/              # Page components
│   │   └── FavoriteListingsPage.tsx
│   ├── services/           # API integration
│   │   └── api.ts
│   ├── styles/             # CSS stylesheets
│   │   ├── index.css
│   │   ├── FavoriteListingsPage.css
│   │   ├── ListingCard.css
│   │   ├── FavoriteButton.css
│   │   └── EmptyState.css
│   ├── types/              # TypeScript type definitions
│   │   └── listing.types.ts
│   ├── utils/              # Utility functions
│   │   └── formatters.ts
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # Vite type definitions
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/splitleasesharath/favorite-listings-page.git
   cd favorite-listings-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Bubble API credentials:
   ```env
   VITE_BUBBLE_API_BASE_URL=https://app.split.lease/version-test/api/1.1
   VITE_BUBBLE_API_TOKEN=your_api_token_here
   VITE_BUBBLE_WF_API_URL=https://app.split.lease/version-test/api/1.1/wf
   VITE_BUBBLE_DATA_API_URL=https://app.split.lease/version-test/api/1.1/obj
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BUBBLE_API_BASE_URL` | Base URL for Bubble API | Yes |
| `VITE_BUBBLE_API_TOKEN` | API authentication token | Yes |
| `VITE_BUBBLE_WF_API_URL` | Workflow API endpoint | Yes |
| `VITE_BUBBLE_DATA_API_URL` | Data API endpoint | Yes |

### API Endpoints

The application connects to the following Bubble endpoints:

- **GET** `/api/1.1/obj/listing` - Fetch favorited listings
- **POST** `/api/1.1/wf/add-to-favorites` - Add listing to favorites
- **POST** `/api/1.1/wf/remove-from-favorites` - Remove listing from favorites
- **GET** `/api/1.1/obj/user/{userId}` - Get user data

## 🧩 Components

### FavoriteListingsPage
Main page component that orchestrates the entire page. Handles:
- Data fetching on page load
- Pagination
- State management
- Error handling
- Loading states

### ListingCard
Individual listing card component. Features:
- Photo display with carousel navigation
- Bedroom/bathroom/kitchen formatted text (4 conditional rules)
- Location and price display
- Favorite toggle button
- Click navigation to detail page

**Props:**
- `listing: Listing` - Listing data object
- `onToggleFavorite: (id: string) => void` - Favorite toggle handler
- `onNavigateToDetail: (id: string) => void` - Navigation handler

### FavoriteButton
Heart icon button for favorite toggling. Features:
- Filled/outline states
- Hover effects
- Animation on toggle
- ARIA labels for accessibility

**Props:**
- `listingId: string` - Listing ID
- `isFavorited: boolean` - Current favorite status
- `onToggle: (id: string) => void` - Toggle handler
- `disabled?: boolean` - Optional disabled state

### EmptyState
Displayed when user has no favorites. Features:
- Icon
- Message text
- CTA button to explore rentals

**Props:**
- `message: string` - Display message
- `ctaText: string` - Button text
- `ctaLink: string` - Navigation link

## 🔌 API Integration

### bubbleApi Service

Located in `src/services/api.ts`, provides methods:

```typescript
// Get favorited listings
bubbleApi.getFavoritedListings(userId, { page, perPage, sortBy })

// Add to favorites
bubbleApi.addToFavorites(userId, listingId)

// Remove from favorites
bubbleApi.removeFromFavorites(userId, listingId)

// Get favorite status
bubbleApi.getFavoriteStatus(userId, listingId)

// Subscribe to new listings emails
bubbleApi.subscribeToNewListings(email, userId)
```

### Data Transformations

The API service automatically transforms Bubble's response format to our TypeScript types, handling:
- Field name mapping (Bubble's capitalized names to camelCase)
- Nested object structures
- Array transformations
- Default value handling
- Type safety

## 🎨 Styling & Responsive Design

### Design System

**Color Palette:**
- Primary Purple: `#3E3161`
- Text Dark: `#424242`
- Text Light: `#666666`
- Background: `#FFFFFF`
- Border: `#E0E0E0`
- Favorite Heart: `#FF6B35`
- Hover Purple: `#9DA9E8`
- Active Purple: `#6C7FEB`

**Typography:**
- Font Family: 'Lato', sans-serif
- Heading Size: 24-32px
- Body Text: 14-16px
- Font Weights: 300 (light), 400 (regular), 700 (bold)

**Spacing:**
- Card Gap: 16px
- Section Padding: 24px
- Internal Padding: 20px

### Responsive Breakpoints

**Desktop (≥ 900px):**
- Cards: 200px min height
- Layout: Photo left, details right (row)
- Photo: 300px width

**Mobile (< 900px):**
- Cards: 550px min height
- Layout: Photo top, details bottom (column)
- Photo: 100% width, 250px height
- Buttons: 85% width

## 📋 Workflows Implemented

All 46 Bubble workflows have been replicated:

### Page Load
- ✅ Initialize user session
- ✅ Fetch favorited listings
- ✅ Apply filters and sorting
- ✅ Render UI components

### User Interactions
- ✅ Toggle favorite (add/remove)
- ✅ Navigate to listing detail
- ✅ Photo carousel navigation (prev/next)
- ✅ Refresh listings
- ✅ Load more (pagination)

### Conditional Display
- ✅ Show empty state when no favorites
- ✅ Show listings grid when favorites exist
- ✅ Bedroom/bathroom formatting (4 conditions)
- ✅ Responsive layout switching

### Error Handling
- ✅ Network error handling
- ✅ Optimistic UI with rollback
- ✅ User-friendly error messages
- ✅ Retry mechanisms

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run type-check

# Run linter
npm run lint
```

### Code Style

- TypeScript strict mode enabled
- ESLint configuration included
- Functional React components with hooks
- CSS modules for component styling
- Comprehensive JSDoc comments

### Adding New Features

1. Create types in `src/types/`
2. Add components in `src/components/`
3. Add styles in `src/styles/`
4. Update API service if needed in `src/services/api.ts`
5. Update documentation

## 🚢 Deployment

### Build

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Hosting Options

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Configure in repository settings
- **S3 + CloudFront**: Upload `dist/` folder

### Environment Variables

Remember to set environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- GitHub Pages: Repository Settings → Secrets

## 📝 Implementation Notes

### Key Differences from Bubble

1. **State Management**: React state instead of Bubble's data states
2. **Routing**: React Router instead of Bubble navigation
3. **API Calls**: Direct REST API calls instead of Bubble's built-in data sources
4. **Styling**: CSS instead of Bubble's visual editor
5. **Workflows**: JavaScript functions instead of Bubble workflows

### Bubble Integration

This application integrates with your existing Bubble backend via REST APIs. The following must be enabled in your Bubble app:

1. **API Connector**: Enable in Settings → API
2. **Data API**: Enable in Settings → API → Data API
3. **Workflow API**: Enable in Settings → API → Workflow API
4. **CORS**: Add your domain to allowed origins

### Future Enhancements

- [ ] Add authentication system
- [ ] Implement search/filter functionality
- [ ] Add map view toggle
- [ ] Build listing detail page
- [ ] Add proposal creation flow
- [ ] Implement messaging system
- [ ] Add analytics tracking
- [ ] Enable offline support
- [ ] Add unit and E2E tests

## 📄 License

This project is private and proprietary to Split Lease.

## 👥 Authors

- Split Lease Team
- Implementation based on Bubble "favorite-listings" page

## 🙏 Acknowledgments

- Original design and workflows from Split Lease Bubble application
- Comprehensive guides provided for migration
- Lato font by Google Fonts

---

For questions or issues, please contact the Split Lease development team.
