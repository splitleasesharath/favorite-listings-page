# Bubble.io Layout Analysis - Favorite Listings Page

**Date**: 2025-01-13
**Source**: https://app.split.lease/version-test/favorite-listings

---

## 🎯 Key Layout Differences

### 1. **Side-by-Side Layout (CRITICAL)**

**Bubble Implementation**:
- Listings panel: **LEFT side** (~45% width)
- Map: **RIGHT side** (~55% width)
- Both are displayed **simultaneously** in a horizontal split layout
- Fixed height layout - no vertical stacking

**Current Code Implementation**:
- Map: **FULL WIDTH** at top
- Listings: **FULL WIDTH** below map
- Vertical stacking layout

**Action Required**: Implement CSS Grid or Flexbox for side-by-side layout

---

### 2. **Split Schedule Selector**

**Bubble Implementation**:
- Prominent **"Select Split Schedule"** section at the top
- **Weekly calendar picker** with day selection (S M T W T F S)
- Shows **Check-In** and **Check-Out** dates below the calendar
- Integrated **"View Map"** button in this section
- Visual design: Light purple background with calendar icons

**Current Code Implementation**:
- Simple date range picker with check-in/check-out inputs
- No weekly calendar interface
- No "View Map" button integrated

**Action Required**: Build weekly schedule selector component

---

### 3. **Map Implementation**

**Bubble Implementation**:
- **Google Maps** (not Leaflet)
- Price pins styled as **white boxes with border** (e.g., "$166", "$291")
- Price pins are **clickable** and show listing details
- Map controls: Map/Satellite toggle, zoom controls
- Map remains **fixed on right side** while scrolling listings

**Current Code Implementation**:
- Leaflet.js with OpenStreetMap
- Custom CSS-based price pins
- Map hides/shows with toggle button

**Action Required**: Consider keeping Leaflet (Google Maps requires API key/billing) but improve pin styling

---

### 4. **Listing Card Layout**

**Bubble Implementation**:
- **Vertical scrollable list** on the left side
- Each card shows:
  - Large photo (full width of left panel)
  - Proposal badge (top-left overlay: "Proposal" + purple ribbon)
  - Location pin icon + address
  - Heart icon (favorite toggle, top-right)
  - Navigation arrows for photo carousel
  - Listing title
  - Guest capacity ("Entire Place - X guests max")
  - Amenities (• bedrooms • bathrooms • kitchen)
  - Host profile (avatar + name + verified badge)
  - Starting price with info icon
  - Current nightly price (larger, bold)
  - Availability message
  - Two buttons: "Send Message" and "View Proposal"

**Current Code Implementation**:
- Horizontal layout (photo left, details right) on desktop
- Less detailed card structure
- No proposal badges
- No guest capacity
- No host profile section
- No "Send Message" / "View Proposal" buttons

**Action Required**: Enhance ListingCard component with additional fields

---

### 5. **Header Differences**

**Bubble Implementation**:
- **Split Lease logo** (centered left)
- **"View Active Proposals (2)"** button (prominent, purple)
- **Notification bell icon** with badge count (9+)
- **User profile** (avatar + name "Rod") on far right
- No "Host with Us" / "Stay with Us" dropdowns
- No "Explore Rentals" / "Sign In / Sign Up" buttons

**Current Code Implementation**:
- Header from `index-header` repository
- Dropdowns for "Host with Us" and "Stay with Us"
- "Explore Rentals" button
- "Sign In | Sign Up" text link

**Action Required**: Create authenticated header variant for logged-in users

---

### 6. **Footer / Bottom Section**

**Bubble Implementation**:
- **Support section** with 4 quick-action icons:
  - Instant Live-Chat
  - Send us an Email
  - Schedule a Call
  - Browse our FAQs
- Each icon is large, purple, with descriptive text below
- This section appears **within the scrollable left panel**

**Current Code Implementation**:
- Full footer from `footer-index` repository
- 5-column layout with links
- Referral section
- Import listing section
- Much more extensive than Bubble's simple support section

**Action Required**: Consider adding support quick-actions section

---

### 7. **Responsive Behavior**

**Bubble Implementation**:
- Desktop: Side-by-side layout maintained
- Mobile: (Need to test in Playwright by resizing)
- Map appears to be hideable via "View Map" button

**Current Code Implementation**:
- Desktop: Vertical stacking
- Mobile (< 900px): Vertical stacking with adjusted sizes
- Map toggles with "Hide Map" / "Show Map" button

**Action Required**: Implement proper side-by-side responsive breakpoints

---

## 📐 Layout Measurements (Approximate)

### Desktop Layout
- **Left Panel (Listings)**: ~650-700px width
- **Right Panel (Map)**: Remaining width (fills viewport)
- **Header Height**: ~70px
- **Schedule Selector Height**: ~120px
- **Listing Card Height**: ~350-400px each
- **Map**: Full height minus header

### Visual Structure
```
┌─────────────────────────────────────────────────────────┐
│  Header (Logo | Proposals | Notifications | Profile)    │
├──────────────────────────────┬──────────────────────────┤
│  Split Schedule Selector     │                          │
│  [S M T W T F S]             │                          │
│  Check-In / Check-Out        │                          │
├──────────────────────────────┤      Google Map          │
│  Listing Card 1              │      with Price Pins     │
│  [Photo, Details, Buttons]   │                          │
├──────────────────────────────┤                          │
│  Listing Card 2              │                          │
│  [Photo, Details, Buttons]   │                          │
├──────────────────────────────┤                          │
│  ...more listings...         │                          │
│  (scrollable)                │                          │
├──────────────────────────────┤                          │
│  Support Quick Actions       │                          │
│  [Chat, Email, Call, FAQs]   │                          │
└──────────────────────────────┴──────────────────────────┘
```

---

## 🎨 Color & Styling Observations

### Colors
- **Primary Purple**: `#31135D` (header background, buttons)
- **Accent Purple**: `#6C5CE7` (proposal badges, icons)
- **Price Text**: Large, bold, black
- **Starting Price**: Gray with info icon
- **Background**: White for cards, light gray for page

### Typography
- **Listing Title**: Bold, ~18-20px
- **Price**: Bold, ~24-28px
- **Details**: Regular, ~14-16px
- **Buttons**: Medium weight, ~16px

### Spacing
- Cards have **consistent padding** (~20-24px)
- Cards have **small gaps** between them (~16px)
- Map has **no padding** - fills entire right side

---

## 🔑 Critical Implementation Priorities

1. **Side-by-side layout** (map right, listings left)
2. **Split Schedule selector** with weekly calendar
3. **Enhanced listing cards** with all fields (proposal badge, host info, buttons)
4. **Authenticated header** (proposals button, notifications, profile)
5. **Scrollable left panel** with fixed map on right
6. **Support quick-actions** section

---

## 📋 CSS Strategy for Side-by-Side Layout

### Option 1: CSS Grid (Recommended)
```css
.favorite-listings-container {
  display: grid;
  grid-template-columns: 650px 1fr;
  height: calc(100vh - 70px); /* Full height minus header */
  gap: 0;
}

.listings-panel {
  overflow-y: auto;
  height: 100%;
}

.map-panel {
  position: sticky;
  top: 70px;
  height: calc(100vh - 70px);
}
```

### Option 2: Flexbox
```css
.favorite-listings-container {
  display: flex;
  height: calc(100vh - 70px);
}

.listings-panel {
  flex: 0 0 650px;
  overflow-y: auto;
}

.map-panel {
  flex: 1;
  position: sticky;
  top: 70px;
}
```

---

## 📱 Mobile Considerations

- Need to test Bubble's mobile behavior
- Likely switches to vertical stacking on mobile
- Map might be hidden by default on mobile
- "View Map" button becomes primary way to show map

---

## 🚀 Next Steps

1. ✅ **Document analysis** (this file)
2. ⏳ **Update CSS** for side-by-side layout
3. ⏳ **Build Split Schedule selector** component
4. ⏳ **Enhance ListingCard** component
5. ⏳ **Create authenticated Header** variant
6. ⏳ **Test in preview** file
7. ⏳ **Test responsive** behavior

---

**Analysis Complete**: Ready to implement side-by-side layout and enhanced components.
