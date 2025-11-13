# Quick Start Guide

Get the Favorite Listings Page running in 5 minutes!

## Prerequisites

- Node.js 18+ or Bun installed
- Git installed
- Bubble API token from Split Lease app

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/splitleasesharath/favorite-listings-page.git
cd favorite-listings-page

# 2. Install dependencies
npm install
# or: bun install

# 3. Create environment file
cp .env.example .env

# 4. Edit .env and add your API token
# Open .env in your text editor and replace:
# VITE_BUBBLE_API_TOKEN=your_api_token_here
```

## Run Development Server

```bash
npm run dev
# or: bun dev
```

Open http://localhost:5173 in your browser!

## What You'll See

- **With Favorites**: A list of all your favorited listings
- **Without Favorites**: An empty state with "Explore Rentals" button
- **Loading**: Spinner while fetching data

## Features to Try

1. **Click a listing card** → Navigate to detail page (placeholder)
2. **Click the heart icon** → Remove from favorites (optimistic update)
3. **Hover over photos** → See previous/next arrows
4. **Click arrows** → Navigate through listing photos
5. **Resize window** → See responsive design (breakpoint at 900px)
6. **Click refresh button** → Reload listings

## Project Structure

```
src/
├── components/       # React components
├── pages/           # Page components
├── services/        # API integration
├── styles/          # CSS files
├── types/           # TypeScript types
└── utils/           # Helper functions
```

## Key Files

- **`src/pages/FavoriteListingsPage.tsx`** - Main page
- **`src/components/ListingCard.tsx`** - Listing display
- **`src/services/api.ts`** - Bubble API calls
- **`src/types/listing.types.ts`** - Type definitions
- **`src/utils/formatters.ts`** - Data formatting

## Troubleshooting

### API calls failing?
Check that your API token is correct in `.env` file

### Images not loading?
Verify CORS is enabled in your Bubble app settings

### TypeScript errors?
Run `npm run type-check` to see detailed errors

### Build failing?
Try deleting `node_modules` and running `npm install` again

## Next Steps

- Read [README.md](README.md) for full documentation
- Read [IMPLEMENTATION.md](IMPLEMENTATION.md) for technical details
- Configure your Bubble API endpoints
- Customize the styling to match your brand
- Add authentication system
- Deploy to production

## Support

For issues or questions:
- Check the [README.md](README.md) documentation
- Review [IMPLEMENTATION.md](IMPLEMENTATION.md) for technical details
- Contact Split Lease development team

---

Happy coding! 🚀
