COMPREHENSIVE GUIDE: FAVORITE LISTINGS PAGE  
Replicating Bubble Design in Code

\========================================  
TABLE OF CONTENTS  
\========================================

1. Page Overview  
2. 2\. Page-Level Configuration  
3. 3\. Layout Structure & Hierarchy  
4. 4\. Component Breakdown  
5. 5\. Styles & Design System  
6. 6\. Conditional Logic  
7. 7\. Responsive Behavior  
8. 8\. Data Binding & Dynamic Content

\========================================

1. PAGE OVERVIEW  
2. \========================================

Page Name: favorite-listings  
Page Type: Native App Page  
Page Title: “Favorite Listings | Split Lease”  
Background: White (\#FFFFFF)  
Time Zone: User’s current timezone

\========================================  
2\. PAGE-LEVEL CONFIGURATION  
\========================================

GENERAL SETTINGS:

- Type of content: Standard page content  
- \- This page is a native app: YES  
- \- Mobile version: Default mobile settings  
- \- Style: None (Custom)  
- \- Opacity: 100%  
- \- Background style: Flat color  
- \- Background color: \#FFFFFF

\========================================

3. LAYOUT STRUCTURE & HIERARCHY  
4. \========================================

The page follows this component hierarchy:

PAGE (favorite-listings)  
├── Overlays  
│   ├── ZEP-\#P: Maps (Group)  
│   ├── Sign up & Login A (Reusable Element)  
│   ├── ZEP-\#P: Show Reviews (Reusable Element)  
│   └── Contact Host (Reusable Element)  
│  
├── FG: Map (Floating Group)  
│  
├── ZEP-\#P: Maps for unique listings (Group)  
│   ├── create-proposal-flow (Reusable Element)  
│   └── Informational text (Reusable Element)  
│  
├── ai popup-signup-search A (Popup)  
│  
├── G: Page Config (Group)  
│  
├── FG: floating group header and selector (Floating Group \- HEADER)  
│  
└── Layers  
    ├── G: Left side, selector and listings (Group \- MAIN CONTENT)  
    │   ├── G: search selector (Group)  
    │   ├── G: listing selected on marker (Group)  
    │   └── G: View for no fav listings (Group \- EMPTY STATE)  
    │       ├── T: No proposals yet (Text)  
    │       └── B: Explore Rentals (Button)  
    │  
    └── Contact Us Icons B (Reusable Element)

\========================================  
4\. COMPONENT BREAKDOWN  
\========================================

—----------------  
4.1 FLOATING HEADER GROUP  
—----------------  
Element: FG: floating group header and selector  
Type: Floating Group  
Container Layout: Row  
Container Alignment: Center

APPEARANCE:

- Visible on page load: YES  
- \- Collapse when hidden: YES  
- \- Parent container type: Column (edit)  
- \- Horizontal alignment: Center  
- \- Make this element fixed-width: YES  
- \- Width: 100%  
- \- Make this element fixed-height: NO  
- \- Min height: 0px  
- \- Max height: inf  
- \- Fit height to content: YES  
- \- Allow vertical scrolling when content overflows: NO

LAYOUT:

- Margins: Top(0px), Bottom(10px), Left(0px), Right(0px)

CONDITIONALS: (3 total)

1. When: This Button is hovered  
2.    \- Background color: \#0DA9E8

2\. When: This Button is pressed

- Background color: \#6C7FEB  
3. When: Current page width \< 900  
4.    \- Width: 85% (responsive)

—----------------  
4.2 EMPTY STATE GROUP  
—----------------  
Element: G: View for no fav listings  
Type: Group

VISIBILITY CONDITIONS:

- This group shows when there are NO favorite listings  
- \- The RepeatingGroup “RG: Listings favorited by…” is hidden when this is visible

CHILD ELEMENTS:

1) Text Element: “T: No proposals yet”  
2)    Content: “You don’t have any favorite listings yet. We invite you to search listings and submit proposals with the weekly schedule you have in mind”  
3)      
4)    APPEARANCE:  
5)    \- Style: \-Paragraph \- Black 14 (Overridden)  
6)    \- Do not apply bb-code: YES  
7)    \- Recognize links and emails: YES  
8)    \- HTML tag for this element (SEO): normal  
9)    \- This element isn’t clickable: YES  
10)    \- Lato font: 400 weight  
11)    \- Font size: 24px  
12)    \- Font color: \#424242  
13)    \- Line spacing: 1.25  
14)    \- Letter spacing: 0  
15)    \- Word spacing: 0  
16)    \- Center text horizontally: YES

B) Button Element: “B: Explore Rentals”  
   Label: “Explore Rentals”  
   Button type: Label  
     
   APPEARANCE:

- This element isn’t clickable: NO (clickable)  
-    \- Style: None (Custom)  
-    \- Opacity: 100%  
-    \- App Font (Lato): 400 weight  
-    \- Font size: 24px  
-    \- Font color: \#FFFFFF  
-    \- Word spacing: 0  
-    \- Line spacing: 1  
-    \- Letter spacing: 0  
-    \- Background style: Flat color  
-    \- Background color: Success (\#3113SD) \- Purple color  
-    \- Define each border independently: NO  
-    \- Border style \- all borders: Double  
-    \- Width: 1px  
-    \- Color: \#6B6B6B  
-    \- Roundness: 0px  
-    \- Shadow style: None

   LAYOUT:

- Width: 67px  
-    \- Height: 51px

   CONDITIONALS (3):

1. When: This Button is hovered  
2.       \- Background color: \#9DA9E8 (lighter purple)  
3.      
4.    2\. When: This Button is pressed  
5.       \- Background color: \#6C7FEB (pressed state purple)  
6.      
7.    3\. When: Current page width \< 900  
8.       \- Width: 85% (responsive width)

—----------------  
4.3 REPEATING GROUP (LISTINGS)  
—----------------  
Element: RG: Listings favorited by the User  
Type: RepeatingGroup

DATA SOURCE:  
Type of content: Listing  
Data source: Current User’s Favorited Listings sorted by Standard:Fullname Nightly Price (Filter)

LAYOUT & APPEARANCE:

- Min height of row: 200px  
- \- Set fixed number of rows: NO (unchecked)  
- \- Stretch rows to fill vertical space: YES  
- \- Set fixed number of columns: NO  
- \- Columns: 1  
- \- Show all items immediately: YES (checked)  
- \- Separators: NO separators  
- \- Style: None  
- \- Display items as masonry grid: NO

APPEARANCE:

- Style: None (Custom)  
- \- Opacity: 100%  
- \- Background style: None  
- \- Define each border independently: YES  
- \- Border style \- all borders: Double  
- \- Width: 1px  
- \- Color: \#6B6B6B  
- \- Roundness: 0px  
- \- Shadow style: None  
- \- Width: 99%  
- \- Height: 0px \- inf

CONDITIONALS (2):

1. When: This RepeatingGroup is visible  
2.    \- Border style \- all borders: None

2\. When: Current page width \< 900

- Min height of row: 550px (responsive)

—----------------  
4.4 LISTING CARD (Inside Repeating Group)  
—----------------

The card inside the Repeating Group contains several elements arranged in a column layout:

STRUCTURE:  
G: Go to Listing (listing card) \- Main container group  
├── G: listing photo (Group \- Image container)  
├── G: all listing details (Group \- Details section)  
│   ├── G: location hood and price (Group)  
│   │   ├── G: Location only (Group)  
│   │   └── T: Bathrooms & Bedrooms INVERTED (Text \- dynamic)  
│   ├── Group Listing (Group \- metadata)  
│   └── Group Listing (Group \- additional metadata)  
└── G: Anchor Text (Group)

CARD CONTAINER:  
Element: G: Go to Listing (listing card)  
Type: Group  
Container layout: Row  
Container alignment: Center (Horizontally)

LAYOUT:

- Visible on page load: YES  
- \- Collapse when hidden: YES  
- \- Parent container type: Column (edit)  
- \- Horizontal alignment: Left  
- \- Make this element fixed-width: YES  
- \- Width: 100%  
- \- Min height: 0px  
- \- Max height: inf  
- \- Fit height to content: YES  
- \- Allow vertical scrolling: NO

LISTING PHOTO:  
Element: G: listing photo  
Type: Group containing image

- Dynamic image source bound to: Current cell’s Listing’s Main’s Image  
- \- Image processing: Photo processed with Imgix

LISTING DETAILS TEXT:  
Element: T: Bathrooms & Bedrooms INVERTED  
Type: Text  
Dynamic content showing:

- “Parent group’s Listing’s Features \- Type of Space’s Label”  
- \- “Parent group’s Listing’s Features \- SQFT Area:formatted…”  
- \- Bedrooms count: “Parent group’s Listing’s Features \- Qty Bedrooms is 0:formatted as text”  
- \- Bathrooms count: Similar formatting

APPEARANCE:

- Style: None (Custom)  
- \- Opacity: 100%  
- \- Lato font: 300 weight  
- \- Font size: 14px  
- \- Font color: \#000000  
- \- Line spacing: 1.31  
- \- Center the text vertically: YES  
- \- Background style: None  
- \- Border style: None  
- \- Show text shadow: NO

LAYOUT:

- Visible on page load: YES  
- \- Collapse when hidden: YES  
- \- Parent container type: Column (edit)  
- \- Horizontal alignment: Left  
- \- Make this element fixed-width: YES  
- \- Width: 100%  
- \- Make this element fixed-height: NO  
- \- Min height: 36px  
- \- Max height: 72px  
- \- Fit height to content: YES  
- \- Margins: All 0px  
- \- Padding: All 0px

CONDITIONALS (4):

1. Conditional formatting for bedroom count display  
2. 2\. Conditional formatting for bathroom count display  
3. 3\. Text color changes based on data availability  
4. 4\. Layout adjustments based on content

\========================================

5. STYLES & DESIGN SYSTEM  
6. \========================================

COLOR PALETTE:

- Primary Background: \#FFFFFF (White)  
- \- Text Primary: \#424242 (Dark gray)  
- \- Text Secondary: \#000000 (Black)  
- \- Accent/Primary Button: \#3113SD (Deep purple \- Success color)  
- \- Button Hover: \#9DA9E8 (Light purple)  
- \- Button Pressed: \#6C7FEB (Medium purple)  
- \- Border Color: \#6B6B6B (Gray)  
- \- Link Color: Blue (standard)

TYPOGRAPHY:  
Primary Font: Lato

- Headers/Titles: 24px, weight 400  
- \- Body Text: 14px, weight 300  
- \- Button Text: 24px, weight 400  
- \- Line Height: 1.25 \- 1.31  
- \- Letter Spacing: 0  
- \- Word Spacing: 0

SPACING SYSTEM:

- Padding: Generally 0px on most elements  
- \- Margins: Varies by component  
-   \- Button margins: 0-10px  
-   \- Group margins: 0px standard  
- \- Gap spacing: Minimal, content-driven

BORDERS & SHADOWS:

- Border Width: 1px (when applied)  
- \- Border Style: Double (for certain elements)  
- \- Border Radius: 0px (sharp corners)  
- \- Box Shadow: None (minimal shadows)

BUTTON STYLES:  
Default State:

- Background: \#3113SD (Purple)  
- \- Text: \#FFFFFF (White)  
- \- Border: 1px double \#6B6B6B  
- \- Roundness: 0px

Hover State:

- Background: \#9DA9E8 (Lighter purple)

Pressed State:

- Background: \#6C7FEB (Medium purple)

Mobile (\<900px width):

- Width: 85%

\========================================  
6\. CONDITIONAL LOGIC  
\========================================

PAGE-LEVEL CONDITIONS:

1. Content Display Logic:  
2.    \- Show “G: View for no fav listings” WHEN Current User’s Favorited Listings is empty  
3.    \- Show “RG: Listings favorited by…” WHEN Current User has Favorited Listings

2\. Responsive Breakpoint:

- Mobile breakpoint: \< 900px width  
-    \- Desktop: \>= 900px width

BUTTON CONDITIONALS (B: Explore Rentals):  
Condition 1 \- Hover State:

- When: This Button is hovered  
- \- Change: Background color → \#9DA9E8

Condition 2 \- Pressed State:

- When: This Button is pressed  
- \- Change: Background color → \#6C7FEB

Condition 3 \- Responsive:

- When: Current page width \< 900  
- \- Change: Width → 85%

REPEATING GROUP CONDITIONALS:  
Condition 1 \- Visibility:

- When: This RepeatingGroup is visible  
- \- Change: Border style \- all borders → None

Condition 2 \- Responsive:

- When: Current page width \< 900  
- \- Change: Min height of row → 550px

FLOATING HEADER CONDITIONALS:  
Similar to button states with additional responsive behavior

TEXT ELEMENT CONDITIONALS:

- Dynamic text visibility based on data availability  
- \- Conditional formatting for “0 bedrooms” vs “1+ bedrooms”  
- \- Color changes based on listing status

\========================================  
7\. RESPONSIVE BEHAVIOR  
\========================================

BREAKPOINTS:

- Desktop: \>= 900px width  
- \- Mobile: \< 900px width

MOBILE ADAPTATIONS (\< 900px):

1. Layout Changes:  
2.    \- Floating group header width: 85%  
3.    \- Button widths: 85%  
4.    \- Repeating group row height: 550px (increased from 200px)

2\. Container Adjustments:

- Fixed-width elements become fluid (85% width)  
-    \- Vertical spacing increases  
-    \- Touch-friendly sizes

3\. Content Stacking:

- Row layouts may convert to column  
-    \- Horizontal groups stack vertically  
-    \- Increased spacing between elements

DESKTOP BEHAVIOR (\>= 900px):

- Full-width layouts (100%)  
- \- Compact vertical spacing  
- \- Row-based layouts maintained  
- \- Fixed dimensions on key elements

\========================================  
8\. DATA BINDING & DYNAMIC CONTENT  
\========================================

DATA SOURCES:

Page Data:

- Current User  
- \- Current User’s Favorited Listings

Repeating Group:

- Type: Listing  
- \- Source: Current User’s Favorited Listings sorted by Standard:Fullname Nightly Price (Filter)  
- \- Sorting: By nightly price

Dynamic Text Bindings:

1. Listing Name:  
2.    \- “Parent group’s Listing’s Name”

2\. Listing Location:

- “Parent group’s Listing’s Location \- Borough’s Display Borough”  
3. Property Features:  
4.    \- Type: “Parent group’s Listing’s Features \- Type of Space’s Label”  
5.    \- SQFT: “Parent group’s Listing’s Features \- SQFT Area:formatted…”  
6.    \- Bedrooms: “Parent group’s Listing’s Features \- Qty Bedrooms is 0:formatted as text”  
7.    \- Bathrooms: “Parent group’s Listing’s Features \- Qty Bathrooms \> 1:formatted as text”

4\. Pricing:

- Starting Price: “Parent group’s Listing’s pricing\_list’s Starting Nightly Price:formatted as $1029/night”

5\. Images:

- Main Image: “Parent group’s Listing’s Main’s Image Counter’s Photo processed with Imgix”

CONDITIONAL DATA DISPLAY:

- Show “0:formatted as text” when bedroom count is 0  
- \- Format bathroom count differently for singular vs plural  
- \- Display availability status based on weeks  
- \- Price formatting with currency symbol

\========================================  
IMPLEMENTATION NOTES  
\========================================

KEY CONSIDERATIONS:

1. Empty State Handling:  
2.    \- Always check if user has favorited listings  
3.    \- Display appropriate message when empty  
4.    \- Provide clear CTA to explore listings

2\. Data Loading:

- Fetch Current User’s Favorited Listings on page load  
-    \- Sort by nightly price  
-    \- Apply filters as configured

3\. Navigation:

- “Explore Rentals” button should navigate to main listings page  
-    \- Individual listing cards should navigate to listing detail page  
-    \- Header elements provide access to other sections

4\. Reusable Components:

- Sign up & Login modal  
-    \- Contact Host modal  
-    \- Show Reviews modal  
-    \- Maps components  
-    \- Contact Us Icons  
5. Performance:  
6.    \- Show all items immediately is enabled  
7.    \- Images processed with Imgix for optimization  
8.    \- Minimal border/shadow rendering for performance

6\. Accessibility:

- Clickable elements clearly defined  
-    \- Text contrast meets standards  
-    \- Touch targets appropriately sized on mobile  
-    \- Semantic HTML tags for SEO

\========================================  
COMPONENT SPECIFICATIONS SUMMARY  
\========================================

FLOATING HEADER:

- Position: Fixed at top  
- \- Width: 100% (desktop), 85% (mobile)  
- \- Background: Varies by implementation  
- \- Contains: Navigation elements, selectors

EMPTY STATE CARD:

- Centered on page  
- \- Contains: Message text \+ CTA button  
- \- Displayed when: No favorited listings  
- \- Button: “Explore Rentals” with hover/pressed states

LISTING CARD (in Repeating Group):

- Width: 99%  
- \- Min Height: 200px (desktop), 550px (mobile)  
- \- Layout: Row with image \+ details  
- \- Border: 1px double \#6B6B6B  
- \- Contains: Image, property details, pricing, location

TEXT ELEMENTS:

- Font: Lato  
- \- Sizes: 14px (body), 24px (headers/buttons)  
- \- Weights: 300 (regular), 400 (medium)  
- \- Line Height: 1.25-1.31  
- \- Color: \#000000, \#424242

BUTTONS:

- Font Size: 24px  
- \- Background: \#3113SD (default)  
- \- Hover: \#9DA9E8  
- \- Pressed: \#6C7FEB  
- \- Border: 1px double \#6B6B6B  
- \- Border Radius: 0px  
- \- Width: Responsive (85% mobile)

\========================================  
END OF GUIDE  
\========================================

This guide provides a complete specification for replicating the Bubble “favorite-listings” page in custom code. Follow the component hierarchy, styling specifications, and conditional logic to recreate the exact functionality and appearance outside of Bubble.

For questions or clarifications about specific elements or behaviors, refer back to the Bubble IDE and inspect individual element properties and workflows.