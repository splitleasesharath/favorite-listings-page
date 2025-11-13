COMPREHENSIVE GUIDE: FAVORITE LISTINGS PAGE  
DATA SCHEMA & IMPLEMENTATION GUIDE

═══════════════════════════════════════════════════════════════

OVERVIEW  
This guide provides a complete technical reference for replicating the “Favorite Listings” page from Bubble in custom code. It covers the data schema, conditional logic, element behaviors, and styling requirements.

═══════════════════════════════════════════════════════════════

1. DATA SCHEMA

1.1 PRIMARY DATA TYPE: Listing

The Listing data type is the core entity with 50+ fields organized into categories:

CORE FIELDS:

* First Available: date  
* • \# of nights available: number (default: 7\)  
* • Search Ranking: number (default: 0\)    
* • Active: yes/no boolean (default: yes)  
* • Approved: yes/no boolean (default: no)  
* • AI Suggestions List: List of ZAT-AI Suggestions  
* • allow alternating roommates?: yes/no boolean (default: yes)  
* • bulk\_upload\_id: text  
* • cancel-features-email-id: text  
* • Cancellation Policy: ZAT-Features \- Cancellation Policy (option set)  
* • Clickers: List of Users  
* • ClicksToViewRatio: number  
* • Complete: yes/no boolean  
* • confirmedAvailability: yes/no boolean  
* • Dates \- Blocked: List of dates

FEATURE FIELDS:

* Errors: List of Important Errors  
* • Features \- Amenities In-Building: List of ZAT-Features \- Amenity  
* • Features \- Amenities In-Unit: List of ZAT-Features \- Amenity  
* • Features \- House Rules: List of ZAT-Features \- HouseRules  
* • Features \- Parking type: ZAT-Features \- Parking Options (option set)  
* • Features \- Photos: List of Listing \- Photos  
* • Features \- Qty Bathrooms: number  
* • Features \- Qty Bedrooms: number  
* • Features \- Qty Beds: number  
* • Features \- Qty Guests: number  
* • Features \- Safety: List of ZFUT-Safety Features  
* • Features \- Secure Storage Option: ZAT-Features \- Storage Options (option set)  
* • Features \- SQFT Area: number  
* • Features \- SQFT of Room: number  
* • Features \- Trial Periods Allowed: yes/no boolean (default: yes)  
* • Features \- Type of Space: ZAT-Features \- Listing Type (option set)

LOCATION FIELDS:

* Kitchen Type: Kitchen Types (option set)  
* • Last Available: date  
* • Lister Price Display: number  
* • Listing Code OP: text  
* • Listing Curation: List of zep-Curation Parameters  
* • Location \- Address: geographic address  
* • Location \- Borough: ZAT-Geo-Borough-Top level (option set)  
* • Location \- City: ZAT-Location (option set)  
* • Location \- Hood: ZAT-Geo-Hood-Medium Level (option set)  
* • Location \- Hoods (new): List of ZAT-Geo-Hood-Medium Levels  
* • Location \- slightly different address: geographic address  
* • Location \- State: text  
* • Location \- Zip Code: text  
* • Map HTML Mobile: text  
* • Map HTML Web: text  
* • Maximum Months: number

AVAILABILITY & PRICING:

* Nearby Suggestions from Host: List of zep-Nearby Suggestions  
* • Nearby Suggestions from SplitLease: List of zep-Nearby Suggestions  
* • NEW Date Check-in Time: Check-In and Check-Out Times (option set, default: 2:00 pm)  
* • NEW Date Check-out Time: Check-In and Check-Out Times (option set, default: 11:00 am)  
* • Nights Available (List of Nights): List of Nightses  
* • Nights Available (numbers): List of numbers  
* • Nights Not Available: List of Nightses  
* • Preferred Gender: Type: Gender (option set, default: No Preference)  
* • Price number (for map): text  
* • price\_suggestion: List of numbers  
* • pricing\_list: pricing\_list (custom data type)  
* • Profile Embedded Image: image  
* • progress: text (default: address)

1.2 RELATED DATA TYPES

User (Account \- Guest):  
Critical field for this page: Favorited Listings \- List of Listings  
This is a many-to-many relationship that stores which listings a user has favorited.  
Other fields: Email, Quick Message, Suggested Listing, User relationship

Listing \- Photos:  
Stores photo data for listings with display order

zep-Curation Parameters:  
Used for listing curation requirements

ZAT-AI Suggestions:  
AI-powered listing suggestions

Pricing\_list:  
Custom pricing structure for listings

1.3 OPTION SETS

The page uses multiple option sets for categorical data:

\#Bathrooms Option Set:  
Options: 1 Bath, 2 Baths, 2.5 Baths, 3 Baths, 3.5 Baths, 4 Baths, 4.5 Baths, 5 Baths, 6 Baths  
Attributes: Numeric (number), Display (text, built-in)

\#Bedrooms, \#Beds, \#Qty Guests: Similar structure

Kitchen Types: Various kitchen type options

Check-In and Check-Out Times: Time slots (e.g., 2:00 pm, 11:00 am)

Type: Gender: Gender preferences including “No Preference”

ZAT-Features Option Sets:

* Parking Options  
* • Storage Options    
* • Listing Type  
* • Cancellation Policy

ZAT-Geo Option Sets:

* Borough-Top level (borough classifications)  
* • Location (city/location options)  
* • Hood-Medium Level (neighborhood classifications)

═══════════════════════════════════════════════════════════════

2. PAGE STRUCTURE & ELEMENTS

2.1 PAGE CONFIGURATION

* Page Title: “Favorite Listings | Split Lease”  
* • Type: Native app page with mobile version  
* • Background color: \#FFFFFF (white)

2.2 MAIN CONTAINER HIERARCHY

Favorite-listings (Page Container)  
├── Floating Group: Header and Navigation  
├── Group: Page Config  
├── Group: Floating group header and selector  
│   └── Search selector with date pickers  
├── Layers Section  
│   ├── Group: Left side, selector and listings  
│   │   ├── Group: search selector  
│   │   ├── Group: listing selected on marker  
│   │   └── Group: “View for no fav listings” (EMPTY STATE)  
│   │       ├── Text: “T: No proposals yet”  
│   │       ├── Text: Multi-line message  
│   │       └── Button: “Explore Rentals”  
│   └── RG: 🧡 Listings favorited by user (REPEATING GROUP \- MAIN DATA DISPLAY)

2.3 EMPTY STATE ELEMENT

Element Name: “T: No proposals yet”  
Display Text: “You don’t have any favorite listings yet. We invite you to search listings and submit proposals with the weekly schedule you have in mind”

Styling:

* Font: Lato, 24px  
* • Color: \#424242 (dark gray)  
* • Style: Paragraph \- Black 14 (Overridden)  
* • Opacity: 100%  
* • Width: 525px  
* • Line height: 1.25  
* • Not clickable  
* • HTML tag: normal  
* • Recognizes links and emails

Button: “Explore Rentals”

* Background: Deep purple (\#3E3161 or similar)  
* • Text color: White  
* • Rounded corners  
* • Positioned below empty state message

2.4 REPEATING GROUP: MAIN LISTINGS DISPLAY

Element: “RG: 🧡 Listings favorited by…”

Data Source Configuration:

* Type of content: Listing  
* • Data source: Current User’s Favorited Listings sorted by Standarized Minimum Nightly Price (Filter)  
* • Layout: Single column (1 column)  
* • Min height of row: 200px (desktop)  
* • Show all items immediately: Enabled  
* • Stretch rows to fill vertical space: Enabled  
* • Style: None (Custom)

Conditional Logic (2 conditionals):

1. When “This RepeatingGroup is visible”:  
2.    → Border style: all borders \= None

2\. When “Current page width \< 900”:  
   → Min height of row: 550px (mobile optimization)

CELL STRUCTURE (Parent group’s Listing):  
Each repeating group cell contains nested groups:

├── Group: “Go to Listing (listing…)”  
│   → Clickable wrapper for navigation to detail page  
│   → Passes Parent group’s Listing as parameter  
│  
├── Group: “G: listing photo”  
│   → Displays listing’s first photo from Features \- Photos  
│   → Uses imgix for image processing and optimization  
│  
├── Group: “G: all listing details \- …”  
│   ├── Group: “G: location hood a…”  
│   │   → Displays Location \- Borough, Hood, City  
│   │  
│   ├── Text: “Bathrooms & Bedrooms” (4 CONDITIONALS \- see section 3\)  
│   │  
│   ├── Group Listing: Listing name and details  
│   │   → Displays Parent group’s Listing’s Name  
│   │  
│   └── Group Listing: Pricing information  
│       → Displays Lister Price Display or pricing\_list data  
│  
└── Group: “G: Anchor Text”  
    → Contains action buttons and heart icon for favoriting

═══════════════════════════════════════════════════════════════

3. CONDITIONAL LOGIC DETAILS

3.1 BEDROOMS & BATHROOMS TEXT DISPLAY (CRITICAL LOGIC)

The “Bathrooms & Bedrooms” text element has 4 conditionals that format the display based on available data.

CONDITIONAL 1: When Features \- Qty Bedrooms is 1  
Display Text: “• 1 bedroom • “ \+ \[Qty Bathrooms formatted as text\] \+ \[additional features\]  
Example Output: “• 1 bedroom • 1 Bath • Full Kitchen”

CONDITIONAL 2: When Features \- Qty Bathrooms is 0    
Display Text: Features \- Qty Bedrooms display formatted as text (bedroom info only)  
Example Output: “• 2 bedrooms”

CONDITIONAL 3: When Features \- Qty Bedrooms \> 1  
Display Text: “• “ \+ \[Parent group’s Listing’s Features \- Qty Bedrooms\] \+ “ bedrooms • “ \+ \[Bathrooms\]  
Example Output: “• 3 bedrooms • 2 Baths • Full Kitchen”

CONDITIONAL 4: When Kitchen Type is empty  
Display Text: “• “ \+ \[Parent group’s Listing’s Features \- Qty Bedrooms display\]  
Example Output: “• 2 bedrooms • 1.5 Baths”

Format Pattern:  
“• \[bedroom count\] bedroom(s) • \[bathroom display\] • \[kitchen type\] • \[other features\]”

Note: The bathroom count uses the option set display value (e.g., “1 Bath”, “2.5 Baths”)

3.2 EMPTY STATE VISIBILITY LOGIC

Show “View for no fav listings” group when:

* Current User’s Favorited Listings count \= 0  
* OR  
* • Current User is not logged in / not authenticated

Show Repeating Group when:

* Current User’s Favorited Listings count \> 0  
* AND  
* • Current User is authenticated

3.3 RESPONSIVE CONDITIONALS

When Current page width \< 900:

* Repeating group row min height: 200px → 550px  
* • Layout switches to mobile-optimized view  
* • Border styles may adjust  
* • Single column layout maintained but with increased height for content stacking

═══════════════════════════════════════════════════════════════

4. ELEMENT BEHAVIORS & INTERACTIONS

4.1 FAVORITE BUTTON/ICON (Heart Icon)  
Visual: Heart icon (filled \= favorited, outline \= not favorited)  
Position: Top right of each listing card  
Color: Likely orange/red (\#FF6B35 or similar) when favorited

Workflow Logic:  
ON CLICK EVENT:  
  IF Current User’s Favorited Listings contains This Listing:  
    ACTION: Remove This Listing from Current User’s Favorited Listings  
    VISUAL: Change to outline heart  
  ELSE:  
    ACTION: Add This Listing to Current User’s Favorited Listings    
    VISUAL: Change to filled heart

Implementation Notes:

* Use optimistic UI updates for instant feedback  
* • Sync with backend immediately  
* • Handle errors gracefully with rollback  
* • Update count in real-time

4.2 LISTING CARD CLICK BEHAVIOR  
Action: Navigate to listing detail page  
Trigger: Click anywhere on listing card (Group: “Go to Listing”)  
Parameter: Parent group’s Listing (full listing object)  
Target Page: Listing detail page  
URL Parameter: Listing ID or slug

4.3 “EXPLORE RENTALS” BUTTON  
Action: Navigate to search/browse/rental listings page  
Purpose: Direct users with no favorites to discover listings  
Trigger: Click on button in empty state  
Visual Feedback: Hover state with slight color change

4.4 SEARCH SCHEDULE SELECTOR  
Components:

* Check-in date selector  
* • Check-out date selector

Display Format:  
“Check-In: \[Search Schedule Selector’s Selected Check In Day (days)’s Display\]”  
“Check-Out: \[Search Schedule Selector’s Selected Check Out Day (days)’s Display\]”

Behavior:

* Opens calendar picker on click  
* • Updates display text dynamically  
* • May filter listings based on availability (if implemented)  
* • Stores selection in URL parameters or state

═══════════════════════════════════════════════════════════════

5. STYLING & VISUAL DESIGN

5.1 COLOR PALETTE

* Primary Purple: \#3E3161 (buttons, primary actions)  
* • Text Dark: \#424242 (body text, headings)  
* • Text Light: \#666666 or similar (secondary info)  
* • Background: \#FFFFFF (white)  
* • Border/Divider: \#E0E0E0 or light gray  
* • Favorite Heart: Orange/Red when active

5.2 TYPOGRAPHY

* Primary Font Family: Lato  
* • Heading Size: 24px  
* • Body Text: 14px    
* • Line Height: 1.25 for paragraphs  
* • Word Spacing: 0  
* • Letter Spacing: 0  
* • Font Weight: Regular (400) for body, Bold (700) for headings

5.3 LISTING CARD STYLING

* Min Height: 200px (desktop), 550px (mobile when width \< 900px)  
* • Background: White (\#FFFFFF)  
* • Border: Subtle border or drop shadow for card separation  
* • Border Radius: 8-12px (rounded corners)  
* • Padding: 16-20px internal spacing  
* • Hover State: Slight elevation/shadow increase  
* • Image Aspect Ratio: Likely 16:9 or 4:3 for listing photos  
* • Photo Position: Left side or top (depending on responsive state)

5.4 RESPONSIVE LAYOUT  
Desktop (width ≥ 900px):

* Single column vertical list  
* • Row height: 200px minimum  
* • Photo on left, details on right (side-by-side)  
* • Fixed width container, centered

Mobile (width \< 900px):

* Single column vertical list maintained  
* • Row height: 550px minimum    
* • Photo on top, details below (stacked)  
* • Full width (minus margins)  
* • Larger touch targets for mobile interaction

5.5 SPACING & ALIGNMENT

* Card spacing: 16-24px between cards  
* • Internal padding: 16-20px  
* • Text line spacing: 1.25  
* • Icon size: 24-32px for heart icon  
* • Button padding: 12px vertical, 24px horizontal

═══════════════════════════════════════════════════════════════

6. DATA QUERIES & API STRUCTURE

6.1 MAIN DATA QUERY

Query Type: Search for Listings  
Constraints:

* Listing must be in Current User’s Favorited Listings  
* • Active \= yes (only active listings)  
* • Approved \= yes (only approved listings)  
* Sort Order: Standarized Minimum Nightly Price (ascending \- lowest price first)  
* Filter: Applied after sort

SQL Equivalent:  
SELECT \* FROM listings   
WHERE id IN (SELECT listing\_id FROM user\_favorited\_listings WHERE user\_id \= {current\_user\_id})  
AND active \= true  
AND approved \= true  
ORDER BY standardized\_min\_nightly\_price ASC;

6.2 RECOMMENDED API ENDPOINT STRUCTURE

GET /api/users/{userId}/favorited-listings  
Query Parameters:

* Page: integer (default: 1\)  
* • per\_page: integer (default: 20\)  
* • sort\_by: string (default: “price\_asc”)

Response Structure:  
{  
  “Listings”: \[  
    {  
      “Id”: “uuid”,  
      “Name”: “string”,  
      “Features”: {  
        “Bedrooms”: number,  
        “Bathrooms”: number,  
        “Type\_of\_space”: “string”,  
        “Kitchen\_type”: “string | null”,  
        “Photos”: \[{“url”: “string”, “order”: number}\]  
      },  
      “Location”: {  
        “Borough”: “string”,  
        “Hood”: “string”,  
        “City”: “string”,  
        “Address”: “string”  
      },  
      “Pricing”: {  
        “Display\_price”: number,  
        “Currency”: “USD”  
      },  
      “Availability”: {  
        “First\_available”: “date”,  
        “Last\_available”: “date”  
      },  
      “Is\_favorited”: true,  
      “Active”: true,  
      “Approved”: true  
    }  
  \],  
  “Pagination”: {  
    “Total”: number,  
    “Page”: number,  
    “Per\_page”: number,  
    “Total\_pages”: number  
  }  
}

6.3 FAVORITE TOGGLE ENDPOINTS

Add to Favorites:  
POST /api/users/{userId}/favorites/{listingId}  
Response: 201 Created, returns updated favorites count

Remove from Favorites:  
DELETE /api/users/{userId}/favorites/{listingId}  
Response: 204 No Content

Get Favorite Status:  
GET /api/users/{userId}/favorites/{listingId}  
Response: {“is\_favorited”: boolean}

═══════════════════════════════════════════════════════════════

7. IMPLEMENTATION CHECKLIST

7.1 DATABASE SETUP  
☐ Create listings table with all 50+ fields  
☐ Create users table with authentication fields  
☐ Create user\_favorited\_listings junction table (user\_id, listing\_id, created\_at)  
☐ Create listing\_photos table (listing\_id, photo\_url, display\_order)  
☐ Set up option set tables or enums for categorical fields  
☐ Add indexes on: active, approved, user\_id, listing\_id  
☐ Set up geographic/address fields with proper data types  
☐ Configure foreign key constraints

7.2 BACKEND API  
☐ Implement user authentication and session management  
☐ Create GET /users/{userId}/favorited-listings endpoint  
☐ Create POST /users/{userId}/favorites/{listingId} endpoint  
☐ Create DELETE /users/{userId}/favorites/{listingId} endpoint  
☐ Add sorting by price logic  
☐ Implement active & approved filtering  
☐ Add pagination support  
☐ Implement error handling and validation  
☐ Add rate limiting for favorite actions

7.3 FRONTEND COMPONENTS  
☐ Build FavoritedListingsPage container component  
☐ Create ListingCard component with all data fields  
☐ Build EmptyState component with CTA  
☐ Implement FavoriteButton toggle component with heart icon  
☐ Create responsive layout container (desktop/mobile breakpoint at 900px)  
☐ Build SearchScheduleSelector component (optional)  
☐ Implement image gallery/carousel for listing photos  
☐ Add loading skeleton/spinner components

7.4 CONDITIONAL RENDERING LOGIC  
☐ Implement bedroom/bathroom text formatting (4 conditional cases)  
☐ Add empty state vs. listing grid conditional display  
☐ Implement responsive breakpoint at 900px width  
☐ Add authenticated user check for data access  
☐ Implement loading states during data fetch  
☐ Add error state handling

7.5 STYLING IMPLEMENTATION  
☐ Set up CSS variables for color palette (\#3E3161, \#424242, etc.)  
☐ Import and configure Lato font family  
☐ Create listing card styles (200px min height desktop, 550px mobile)  
☐ Implement responsive grid layout (single column)  
☐ Add hover states for interactive elements  
☐ Style favorite heart icon (filled/outline states)  
☐ Create button styles for “Explore Rentals” CTA  
☐ Add smooth transitions for state changes

7.6 INTERACTIONS & BEHAVIORS  
☐ Implement favorite toggle with optimistic UI updates  
☐ Add click handler for listing card → navigation to detail page  
☐ Create “Explore Rentals” button navigation  
☐ Add loading states for favorite action  
☐ Implement toast/snackbar notifications for actions  
☐ Add error handling with user-friendly messages  
☐ Implement retry logic for failed API calls

7.7 DATA FORMATTING  
☐ Format bedroom count (singular “bedroom” vs plural “bedrooms”)  
☐ Format bathroom count using option set display values  
☐ Format price with currency symbol ($) and commas  
☐ Format location display (Borough, Hood, City concatenation)  
☐ Format date displays for availability  
☐ Process and optimize images (aspect ratio, lazy loading)  
☐ Handle missing/null data gracefully

7.8 TESTING  
☐ Unit tests for conditional display logic  
☐ Integration tests for favorite toggle functionality  
☐ E2E tests for complete user flows  
☐ Test empty state rendering (0 favorites)  
☐ Test with various data scenarios (1, 10, 100+ favorites)  
☐ Test responsive breakpoints (mobile/desktop)  
☐ Performance testing with large favorite lists  
☐ Cross-browser compatibility testing  
☐ Accessibility testing (screen readers, keyboard navigation)

═══════════════════════════════════════════════════════════════

8. CODE EXAMPLES

8.1 DATABASE SCHEMA (PostgreSQL)

CREATE TABLE listings (  
  Id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
  First\_available DATE,  
  Nights\_available INTEGER DEFAULT 7,  
  Search\_ranking DECIMAL DEFAULT 0,  
  Active BOOLEAN DEFAULT true,  
  Approved BOOLEAN DEFAULT false,  
  Features\_qty\_bedrooms INTEGER,  
  Features\_qty\_bathrooms DECIMAL(3,1),  
  Features\_type\_of\_space VARCHAR(100),  
  Location\_borough VARCHAR(100),  
  Location\_city VARCHAR(100),  
  Location\_hood VARCHAR(100),  
  Location\_address TEXT,  
  Location\_lat DECIMAL(10,8),  
  Location\_lng DECIMAL(11,8),  
  Lister\_price\_display DECIMAL(10,2),  
  Kitchen\_type VARCHAR(50),  
  Created\_at TIMESTAMP DEFAULT NOW(),  
  Updated\_at TIMESTAMP DEFAULT NOW()  
);

CREATE TABLE users (  
  Id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
  Email VARCHAR(255) UNIQUE NOT NULL,  
  Created\_at TIMESTAMP DEFAULT NOW()  
);

CREATE TABLE user\_favorited\_listings (  
  User\_id UUID REFERENCES users(id) ON DELETE CASCADE,  
  Listing\_id UUID REFERENCES listings(id) ON DELETE CASCADE,  
  Created\_at TIMESTAMP DEFAULT NOW(),  
  PRIMARY KEY (user\_id, listing\_id)  
);

CREATE INDEX idx\_listings\_active\_approved ON listings(active, approved);  
CREATE INDEX idx\_listings\_price ON listings(lister\_price\_display);  
CREATE INDEX idx\_user\_favorites ON user\_favorited\_listings(user\_id);

8.2 CONDITIONAL DISPLAY LOGIC (JavaScript/React)

Function formatBedroomBathroom(listing) {  
  Const bedrooms \= listing.features.bedrooms;  
  Const bathrooms \= listing.features.bathrooms;  
  Const kitchenType \= listing.features.kitchen\_type;  
    
  Let parts \= \[\];  
    
  // Bedroom formatting  
  If (bedrooms \=== 1\) {  
    parts.push(“1 bedroom”);  
  } else if (bedrooms \> 1\) {  
    parts.push(\`${bedrooms} bedrooms\`);  
  }  
    
  // Bathroom formatting  
  If (bathrooms \> 0\) {  
    Const bathroomDisplay \= getBathroomDisplay(bathrooms);  
    parts.push(bathroomDisplay);  
  }  
    
  // Kitchen type  
  If (kitchenType && kitchenType \!== “”) {  
    parts.push(kitchenType);  
  }  
    
  Return parts.length \> 0 ? “• “ \+ parts.join(“ • “) : “”;  
}

Function getBathroomDisplay(count) {  
  Const bathroomMap \= {  
    1: “1 Bath”,  
    1.5: “1.5 Baths”,  
    2: “2 Baths”,  
    2.5: “2.5 Baths”,  
    3: “3 Baths”,  
    3.5: “3.5 Baths”,  
    4: “4 Baths”,  
    4.5: “4.5 Baths”,  
    5: “5 Baths”,  
    6: “6 Baths”  
  };  
  Return bathroomMap\[count\] || \`${count} Baths\`;  
}

8.3 REACT COMPONENT EXAMPLE

Import React, { useState, useEffect } from ‘react’;

Function FavoritedListingsPage({ currentUser }) {  
  Const \[listings, setListings\] \= useState(\[\]);  
  Const \[loading, setLoading\] \= useState(true);  
    
  useEffect(() \=\> {  
    fetchFavoritedListings();  
  }, \[currentUser\]);  
    
  Const fetchFavoritedListings \= async () \=\> {  
    Try {  
      Const response \= await fetch(\`/api/users/${[currentUser.id](http://currentUser.id)}/favorited-listings\`);  
      Const data \= await response.json();  
      setListings(data.listings);  
    } catch (error) {  
      console.error(‘Error fetching favorites:’, error);  
    } finally {  
      setLoading(false);  
    }  
  };  
    
  Const toggleFavorite \= async (listingId) \=\> {  
    Const listing \= listings.find(l \=\> [l.id](http://l.id) \=== listingId);  
      
    // Optimistic update  
    setListings(listings.filter(l \=\> [l.id](http://l.id) \!== listingId));  
      
    Try {  
      Await fetch(\`/api/users/${[currentUser.id](http://currentUser.id)}/favorites/${listingId}\`, {  
        Method: ‘DELETE’  
      });  
    } catch (error) {  
      // Rollback on error  
      setListings(\[...listings, listing\]);  
      alert(‘Failed to remove from favorites’);  
    }  
  };  
    
  If (loading) return \<LoadingSpinner /\>;  
    
  If (listings.length \=== 0\) {  
    Return (  
      \<EmptyState   
        message=”You don’t have any favorite listings yet. We invite you to search listings and submit proposals with the weekly schedule you have in mind”  
        ctaText=”Explore Rentals”  
        ctaLink=”/search”  
      /\>  
    );  
  }  
    
  Return (  
    \<div className=”favorited-listings-container”\>  
      {listings.map(listing \=\> (  
        \<ListingCard   
          key={[listing.id](http://listing.id)}  
          listing={listing}  
          onToggleFavorite={toggleFavorite}  
        /\>  
      ))}  
    \</div\>  
  );  
}

8.4 CSS STYLING EXAMPLE

.favorited-listings-container {  
  Max-width: 1200px;  
  Margin: 0 auto;  
  Padding: 24px;  
}

.listing-card {  
  Min-height: 200px;  
  Background: \#FFFFFF;  
  Border-radius: 12px;  
  Border: 1px solid \#E0E0E0;  
  Margin-bottom: 16px;  
  Padding: 20px;  
  Display: flex;  
  Gap: 20px;  
  Cursor: pointer;  
  Transition: box-shadow 0.2s;  
}

.listing-card:hover {  
  Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  
}

.listing-photo {  
  Width: 300px;  
  Height: 200px;  
  Object-fit: cover;  
  Border-radius: 8px;  
}

.listing-details {  
  Flex: 1;  
  Display: flex;  
  Flex-direction: column;  
  Gap: 8px;  
}

.bedroom-bathroom-text {  
  Font-family: ‘Lato’, sans-serif;  
  Font-size: 14px;  
  Color: \#424242;  
  Line-height: 1.25;  
}

.favorite-button {  
  Position: absolute;  
  Top: 16px;  
  Right: 16px;  
  Width: 32px;  
  Height: 32px;  
  Background: none;  
  Border: none;  
  Cursor: pointer;  
  Font-size: 24px;  
}

.favorite-button.favorited {  
  Color: \#FF6B35;  
}

.favorite-button.not-favorited {  
  Color: \#CCCCCC;  
}

/\* Mobile responsive \*/  
@media (max-width: 900px) {  
  .listing-card {  
    Min-height: 550px;  
    Flex-direction: column;  
  }  
    
  .listing-photo {  
    Width: 100%;  
    Height: 250px;  
  }  
}

═══════════════════════════════════════════════════════════════

9. PRODUCTION CONSIDERATIONS

9.1 SCALABILITY

* Implement caching: Redis for frequently accessed favorite lists  
* • Database optimization: Connection pooling, read replicas for queries  
* • CDN for images: Use imgix or similar for photo optimization  
* • Rate limiting: Limit favorite actions to prevent abuse (e.g., 50 per minute)  
* • Pagination: Implement cursor-based or offset pagination for large lists  
* • Query optimization: Ensure proper indexes on all query fields

9.2 SECURITY

* Authentication: Validate user authentication on all favorite endpoints  
* • Authorization: Ensure users can only access their own favorites  
* • Input validation: Sanitize all user inputs, validate listing IDs  
* • CSRF protection: Implement CSRF tokens for state-changing operations  
* • HTTPS only: All API calls must use HTTPS  
* • SQL injection prevention: Use parameterized queries  
* • Rate limiting: Prevent abuse of favorite toggle functionality

9.3 PERFORMANCE

* Image optimization: Lazy load images, use responsive images (srcset)  
* • Code splitting: Load listing card components on demand  
* • Bundle optimization: Minimize JavaScript bundle size  
* • Database queries: Use EXPLAIN ANALYZE to optimize slow queries  
* • Caching strategy: Cache user favorite lists for 5-10 minutes  
* • Prefetching: Prefetch listing detail pages on hover  
* • Debouncing: Debounce favorite toggle to prevent rapid clicks

9.4 MONITORING & ANALYTICS

* Track metrics: Favorite/unfavorite action rates, empty state views  
* • Error monitoring: Use Sentry or similar for error tracking  
* • Performance monitoring: Track API response times, page load times  
* • User analytics: Track engagement with favorited listings  
* • Query monitoring: Log and alert on slow database queries  
* • Uptime monitoring: Monitor API availability

9.5 ACCESSIBILITY

* Semantic HTML: Use proper heading hierarchy, landmarks  
* • ARIA labels: Add descriptive labels for icon-only buttons  
* • Keyboard navigation: Ensure all interactions work with keyboard  
* • Focus indicators: Visible focus states for keyboard users  
* • Screen reader support: Provide descriptive text for all interactive elements  
* • Color contrast: Ensure WCAG AA compliance (4.5:1 for text)  
* • Skip links: Allow users to skip navigation  
* • Alt text: Provide meaningful alt text for all listing images

9.6 ERROR HANDLING

* User-friendly messages: Clear error messages for failed actions  
* • Retry logic: Implement exponential backoff for failed API calls  
* • Graceful degradation: Handle missing data fields gracefully  
* • Network errors: Show offline indicator, queue actions  
* • Validation errors: Show inline validation messages  
* • 404 handling: Handle deleted listings gracefully  
* • Server errors: Show generic error message, log details

9.7 SEO CONSIDERATIONS

* Page title: “Your Favorite Listings | Split Lease”  
* • Meta description: Describe the favorites page for search engines  
* • Structured data: Implement [Schema.org](http://Schema.org) markup for listings  
* • Canonical URL: Set proper canonical URL  
* • Open Graph tags: For social media sharing  
* • Sitemap: Include favorites page in sitemap (if public)

═══════════════════════════════════════════════════════════════

10. SUMMARY

This comprehensive guide provides all technical details needed to replicate the Bubble “Favorite Listings” page in custom code.

KEY TAKEAWAYS:

1. DATA SCHEMA: 50+ Listing fields, many-to-many User-Listing relationship through Favorited Listings  
2. CORE LOGIC: 4 conditionals for bedroom/bathroom display, responsive breakpoint at 900px width  
3. MAIN QUERY: Current User’s Favorited Listings, filtered by Active=yes and Approved=yes, sorted by price  
4. EMPTY STATE: Show when favorites count \= 0, with CTA to explore rentals  
5. REPEATING GROUP: Single column layout, 200px rows (desktop), 550px rows (mobile \< 900px)  
6. FAVORITE TOGGLE: Optimistic UI updates with backend sync, add/remove from favorites list  
7. STYLING: Lato font, \#3E3161 primary purple, \#424242 text, white background, responsive cards  
8. API ENDPOINTS: GET /users/{id}/favorited-listings, POST/DELETE for toggle  
9. PERFORMANCE: Image optimization, caching, pagination for scale  
10. ACCESSIBILITY: ARIA labels, keyboard navigation, WCAG compliance

NEXT STEPS:

1. Set up database schema with all tables and relationships  
2. 2\. Implement backend API endpoints for favorites  
3. 3\. Build frontend components with conditional logic  
4. 4\. Apply responsive styling with breakpoints  
5. 5\. Test thoroughly across devices and scenarios  
6. 6\. Deploy with monitoring and error tracking

═══════════════════════════════════════════════════════════════

END OF GUIDE

Document created: December 2024  
Source: Bubble “Favorite Listings” page analysis  
Purpose: Technical reference for custom code replication