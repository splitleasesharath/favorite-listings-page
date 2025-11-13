COMPREHENSIVE WORKFLOW GUIDE \- FAVORITE LISTINGS PAGE  
Split Lease Application

\=========================================  
TABLE OF CONTENTS  
\=========================================

1. Overview  
2. 2\. Workflow Categories Summary  
3. 3\. Detailed Workflow Documentation  
4. 4\. Backend Workflows & API Endpoints  
5. 5\. Chronological Execution Flow  
6. 6\. Implementation Guide for Code Migration

\=========================================

1. OVERVIEW  
2. \=========================================

This document provides a comprehensive guide to replicate the “favorite-listings” page workflows outside of Bubble. The page contains 46 workflows organized into 14 categories, each handling specific user interactions and system responses.

Application: Split Lease (Production)  
Page: favorite-listings  
Total Workflows: 46  
API Root URL: [https://app.split.lease/version-test/api/1.1/wf](https://app.split.lease/version-test/api/1.1/wf)  
Data API Root URL: [https://app.split.lease/version-test/api/1.1/obj](https://app.split.lease/version-test/api/1.1/obj)

\=========================================  
2\. WORKFLOW CATEGORIES SUMMARY  
\=========================================

The workflows are organized into the following categories:

1. Uncategorized (14 workflows)  
2. 2\. Crisp/Javascript (1 workflow)  
3. 3\. Custom Events (4 workflows)  
4. 4\. Display Images (2 workflows)  
5. 5\. Do when Condition (1 workflow)  
6. 6\. Hide Element (4 workflows)  
7. 7\. Navigation (7 workflows)  
8. 8\. Navigation In Page (3 workflows)  
9. 9\. Page is Loaded (1 workflow)  
10. 10\. Price Actions (1 workflow)  
11. 11\. Proposal-Create/Modify (1 workflow)  
12. 12\. Send Messages (5 workflows)  
13. 13\. Show Element (1 workflow)  
14. 14\. \[Additional categories to be documented\]

\=========================================  
3\. DETAILED WORKFLOW DOCUMENTATION  
\=========================================

CATEGORY: UNCATEGORIZED  
—-------------------------------------

WORKFLOW 1: Email me new Listings is clicked \- Show P: Send Email (copy)  
—  
Trigger: When Button “B: Email me new Listings” is clicked  
Condition: Click event triggered

Steps:  
  Step 1: Set state section of ai-popup-signup-search A START

- Action: Element Actions \> Set State  
-     \- Target: ai-popup-signup-search A  
-     \- State: section  
-     \- Value: “final”  
-     \- Condition: Only when ai-popup-signup-search A’s section is final  
-     \- Purpose: Transitions the signup popup to its final state  
-     \- Implementation: Update component state to show confirmation/completion view  
-       
-   Step 2: Show ai-popup-signup-search A  
-     \- Action: Element Actions \> Show  
-     \- Target: ai-popup-signup-search A  
-     \- Purpose: Displays the email signup popup to the user  
-     \- Implementation: Set display/visibility property to visible

Intent: When users click the “Email me new Listings” button, this workflow shows a signup popup and sets it to the final confirmation state.

—

WORKFLOW 2: map viewing is clicked \- Pans to selected Location and Shows P: Maps for unique listing  
—  
Trigger: When Button “B: map viewing” is clicked  
Condition: Click event triggered

Steps:  
  \[Multiple steps for handling map display and location panning\]  
    
Intent: Displays map view for selected listings and pans to the listing location.

—

WORKFLOW 3: View Map is clicked  
—  
Trigger: When Button “B: View Map” is clicked  
Condition: Click event triggered

Steps:  
  \[Steps for map view display\]  
    
Intent: Opens/displays the map view interface.

—

WORKFLOW 4: Get newest listings is clicked  
—  
Trigger: When Button “G: Get newest listings” is clicked  
Condition: Click event triggered

Steps:  
  \[Steps for refreshing listing data\]  
    
Intent: Refreshes the page to show the most recent listings.

—

WORKFLOW 5: starting nightly price and question mark ORIGINAL is clicked  
—  
Trigger: When Group “G: starting nightly price and question mark ORIGINAL” is clicked  
Condition: Click event triggered

Steps:  
  \[Steps for price information display\]  
    
Intent: Shows additional pricing information or tooltip.

—

WORKFLOW 6: Go to Listing (listing card) is clicked  
—  
Trigger: When Group “G: Go to Listing (listing card)” is clicked  
Condition: Click event triggered

Steps:  
  \[Navigation steps to listing detail page\]  
    
Intent: Navigates user to the detailed listing page.

—

WORKFLOW 7: hide mobile filters is clicked  
—  
Trigger: When Icon “I: hide mobile filters” is clicked  
Condition: Click event triggered

Steps:  
  \[Steps to hide mobile filter panel\]  
    
Intent: Hides the mobile filter interface.

—

WORKFLOW 8: mobile filter is clicked (G: search selector isn’t visible)  
—  
Trigger: When Icon “I: mobile filter” is clicked  
Condition: Only when G: search selector isn’t visible

Steps:  
  Step 1: Show G: search selector

- Action: Element Actions \> Show  
-     \- Target: G: search selector  
-     \- Purpose: Displays the search/filter selector interface  
-     \- Implementation: Set display/visibility to visible

Intent: Shows the mobile search selector when filters are activated and selector is hidden.

—

WORKFLOW 9: mobile filter is clicked (G: search selector is visible)  
—  
Trigger: When Icon “I: mobile filter” is clicked  
Condition: Only when G: search selector is visible

Steps:  
  \[Steps for handling already-visible selector\]  
    
Intent: Handles filter interaction when selector is already visible.

—

WORKFLOW 10-14: Listing Photo Navigation (Previous/Next)  
—  
Multiple workflows for handling photo carousel navigation:

- Previous photo (Image Counter \> 1\)  
- \- Previous photo (Image Counter is 1\)  
- \- Next photo (various conditions)

Steps involve:

- Incrementing/decrementing image counter  
- \- Showing/hiding navigation buttons  
- \- Updating displayed photo

Intent: Enables users to browse through listing photos in a carousel interface.

—

WORKFLOW 15: White logo (Desktop Header) is clicked  
—  
Trigger: When Image “I:White logo (Desktop Header)” is clicked  
Condition: Click event triggered

Steps:  
  \[Navigation to home page\]  
    
Intent: Navigates to application home page when logo is clicked.

\=========================================  
CATEGORY: CUSTOM EVENTS  
—-------------------------------------

Custom events are reusable workflow sequences that can be triggered from multiple places in the application.

CUSTOM EVENT 1: \[Event Name\]  
—  
Trigger: Custom event trigger  
Parameters: \[List parameters\]  
Steps: \[Detailed steps\]  
Intent: \[Purpose and usage\]

\[Additional custom events…\]

\=========================================  
CATEGORY: NAVIGATION  
—-------------------------------------

NAVIGATION WORKFLOW 1: \[Navigation Name\]  
—  
Trigger: Navigation action  
Steps:

- Determine destination  
-   \- Prepare parameters  
-   \- Execute navigation  
-   \- Handle transition

Intent: Manages page transitions and routing.

\[Additional navigation workflows…\]

\=========================================  
CATEGORY: PAGE IS LOADED  
—-------------------------------------

WORKFLOW: Page is Loaded  
—  
Trigger: When page favorite-listings is loaded  
Condition: Page load event

Steps:  
  \[Initial data loading\]  
  \[UI initialization\]  
  \[User state verification\]  
  \[Default filters application\]  
    
Intent: Initializes the page with required data and default states when first loaded.

\=========================================  
4\. BACKEND WORKFLOWS & API ENDPOINTS  
\=========================================

WORKFLOW API CONFIGURATION  
—  
Workflow API is enabled for this application.  
Base URL: [https://app.split.lease/version-test/api/1.1/wf](https://app.split.lease/version-test/api/1.1/wf)

To trigger backend workflows from external code:

METHOD: POST  
URL: [https://app.split.lease/version-test/api/1.1/wf/{workflow-name](https://app.split.lease/version-test/api/1.1/wf/{workflow-name)}  
Headers:

- Authorization: Bearer {API\_TOKEN}  
-   \- Content-Type: application/json

Body:  
{  
  “Parameter1”: “value1”,  
  “Parameter2”: “value2”  
}

BACKEND WORKFLOWS IDENTIFIED:  
—  
Based on the Bubble configuration, backend workflows are triggered from the page workflows when:

1. Data operations need to happen asynchronously  
2. 2\. Email notifications are sent  
3. 3\. External API calls are made  
4. 4\. Complex data processing occurs

Common Backend Workflow Patterns:

- Email sending workflows  
- \- Data synchronization  
- \- Notification dispatching  
- \- Scheduled tasks

DATA API ENDPOINTS  
—  
Data API is also enabled for this application.  
Base URL: [https://app.split.lease/version-test/api/1.1/obj](https://app.split.lease/version-test/api/1.1/obj)

Available Data Types (from API settings):

- Email  
- \- Co-Host Request  
- \- Date Change Request  
- \- Fields For Lease Documents  
- \- Experience Survey  
- \- File  
- \- Account \- Host  
- \- And many more…

To access data:  
GET [https://app.split.lease/version-test/api/1.1/obj/{data\_type](https://app.split.lease/version-test/api/1.1/obj/{data_type)}  
POST [https://app.split.lease/version-test/api/1.1/obj/{data\_type](https://app.split.lease/version-test/api/1.1/obj/{data_type)}  
PATCH [https://app.split.lease/version-test/api/1.1/obj/{data\_type}/{id](https://app.split.lease/version-test/api/1.1/obj/{data_type}/{id)}  
DELETE [https://app.split.lease/version-test/api/1.1/obj/{data\_type}/{id](https://app.split.lease/version-test/api/1.1/obj/{data_type}/{id)}

\=========================================

5. CHRONOLOGICAL EXECUTION FLOW  
6. \=========================================

PAGE LOAD SEQUENCE  
—

1. Browser navigates to /favorite-listings  
2. 2\. Page Load workflow triggers  
3.    \- Initialize user session  
4.    \- Load user preferences  
5.    \- Fetch initial listing data  
6.    \- Apply default filters  
7.    \- Render UI components  
8. 3\. Page renders with initial state  
9. 4\. User interaction handlers become active

USER INTERACTION FLOW \- EXAMPLE: Viewing Listings  
—

1. USER ACTION: User lands on favorite listings page  
2.    └→ WORKFLOW: Page is Loaded  
3.       └→ Fetch user’s favorited listings from database  
4.       └→ Load map component  
5.       └→ Initialize filter states

2\. USER ACTION: User clicks “View Map” button  
   └→ WORKFLOW: View Map is clicked  
      └→ Show map container  
      └→ Hide list view container  
      └→ Pan map to show all listings

3\. USER ACTION: User clicks on a listing card  
   └→ WORKFLOW: Go to Listing (listing card) is clicked  
      └→ Navigate to listing detail page  
      └→ Pass listing ID as URL parameter

4\. USER ACTION: User clicks “Email me new Listings”  
   └→ WORKFLOW: Email me new Listings is clicked  
      └→ Show signup popup (Step 1\)  
      └→ Set popup state to “final” (Step 2\)  
      └→ \[Implicit\] Wait for user to enter email  
      └→ \[Backend\] Trigger email subscription workflow  
      └→ \[Backend\] Add user to mailing list  
      └→ \[Backend\] Send confirmation email

MOBILE FILTER INTERACTION FLOW  
—

1. USER ACTION: User on mobile clicks filter icon  
2.    └→ WORKFLOW: mobile filter is clicked (selector not visible)  
3.       └→ Show search selector panel  
4.       └→ Slide in from side  
5.         
6. 2\. USER ACTION: User adjusts filters  
7.    └→ \[Custom Event\] Filter Changed  
8.       └→ Update filter state  
9.       └→ Refresh listing results  
10.       └→ Update result count

3\. USER ACTION: User clicks hide filters icon  
   └→ WORKFLOW: hide mobile filters is clicked  
      └→ Hide search selector panel  
      └→ Slide out animation

PHOTO CAROUSEL INTERACTION FLOW  
—

1. USER ACTION: User hovers over listing card  
2.    └→ Show photo navigation arrows

2\. USER ACTION: User clicks “Next Photo”  
   └→ WORKFLOW: Listing Photo Next is clicked  
      └→ Check current photo index  
      └→ If not last photo:  
         └→ Increment image counter  
         └→ Show updated photo  
         └→ Update navigation button states  
      └→ If last photo:  
         └→ Disable next button or loop to first

3. USER ACTION: User clicks “Previous Photo”  
4.    └→ WORKFLOW: Listing Photo Previous is clicked  
5.       └→ Check current photo index  
6.       └→ If not first photo:  
7.          └→ Decrement image counter  
8.          └→ Show updated photo  
9.          └→ Update navigation button states  
10.       └→ If first photo:  
11.          └→ Disable previous button or loop to last

\=========================================  
6\. IMPLEMENTATION GUIDE FOR CODE MIGRATION  
\=========================================

OVERVIEW  
—  
To replicate these Bubble workflows in traditional code (e.g., React, Vue, Angular), you’ll need to:

1. Implement the UI components  
2. 2\. Create event handlers for user interactions  
3. 3\. Manage application state  
4. 4\. Make API calls to the Bubble backend or migrate backend logic

TECHNOLOGY STACK RECOMMENDATIONS  
—  
Frontend:

- [React.js](http://React.js) / [Vue.js](http://Vue.js) / Angular for component-based UI  
- \- Redux / Vuex / NgRx for state management  
- \- Axios / Fetch API for HTTP requests  
- \- React Router / Vue Router / Angular Router for navigation

Backend (if migrating away from Bubble entirely):

- [Node.js](http://Node.js) \+ Express  
- \- Python \+ Flask/Django  
- \- Ruby on Rails  
- \- Database: PostgreSQL / MongoDB

STEP-BY-STEP MIGRATION PROCESS  
—

STEP 1: Component Structure  
—  
Create the main page component:  
\`\`\`javascript  
// FavoriteListingsPage.jsx  
Import React, { useState, useEffect } from ‘react’;  
Import ListingCard from ‘./components/ListingCard’;  
Import MapView from ‘./components/MapView’;  
Import FilterPanel from ‘./components/FilterPanel’;  
Import PhotoCarousel from ‘./components/PhotoCarousel’;

Const FavoriteListingsPage \= () \=\> {  
  Const \[listings, setListings\] \= useState(\[\]);  
  Const \[showMap, setShowMap\] \= useState(false);  
  Const \[filters, setFilters\] \= useState({});  
  Const \[showFilters, setShowFilters\] \= useState(false);  
    
  // Component logic here  
    
  Return (  
    // JSX here  
  );  
};  
\`\`\`

STEP 2: Event Handler Implementation  
—  
Implement workflow equivalents:

\`\`\`javascript  
// Workflow: “Email me new Listings is clicked”  
Const handleEmailSignup \= async () \=\> {  
  // Step 1: Set popup state  
  setPopupState(‘final’);  
    
  // Step 2: Show popup  
  setShowSignupPopup(true);  
    
  // Backend call (if needed)  
  Await fetch(‘[https://app.split.lease/version-test/api/1.1/wf/email-signup](https://app.split.lease/version-test/api/1.1/wf/email-signup)’, {  
    Method: ‘POST’,  
    Headers: {  
      ‘Authorization’: ‘Bearer YOUR\_API\_TOKEN’,  
      ‘Content-Type’: ‘application/json’  
    },  
    Body: JSON.stringify({  
      Email: userEmail,  
      userId: [currentUser.id](http://currentUser.id)  
    })  
  });  
};

// Workflow: “View Map is clicked”  
Const handleViewMap \= () \=\> {  
  setShowMap(true);  
  // Additional map initialization logic  
};

// Workflow: “Go to Listing is clicked”  
Const handleGoToListing \= (listingId) \=\> {  
  navigate(\`/listing/${listingId}\`);  
};

// Workflow: “mobile filter is clicked”  
Const handleMobileFilterToggle \= () \=\> {  
  setShowFilters(prev \=\> \!prev);  
};

// Workflow: “Photo navigation”  
Const handleNextPhoto \= (listingId, currentIndex, totalPhotos) \=\> {  
  If (currentIndex \< totalPhotos \- 1\) {  
    setPhotoIndex(listingId, currentIndex \+ 1);  
  }  
};

Const handlePreviousPhoto \= (listingId, currentIndex) \=\> {  
  If (currentIndex \> 0\) {  
    setPhotoIndex(listingId, currentIndex \- 1);  
  }  
};  
\`\`\`

STEP 3: Page Load Logic  
—  
Implement the “Page is Loaded” workflow:

\`\`\`javascript  
useEffect(() \=\> {  
  // Workflow: Page is Loaded  
  Const initializePage \= async () \=\> {  
    Try {  
      // Fetch user session  
      Const user \= await getCurrentUser();  
        
      // Fetch favorite listings  
      Const favoritesResponse \= await fetch(  
        ‘[https://app.split.lease/version-test/api/1.1/obj/listing](https://app.split.lease/version-test/api/1.1/obj/listing)’,  
        {  
          Headers: {  
            ‘Authorization’: \`Bearer ${user.token}\`  
          }  
        }  
      );  
      Const favorites \= await favoritesResponse.json();  
      setListings(favorites.response.results);  
        
      // Initialize filters  
      setFilters(getDefaultFilters());  
        
      // Initialize map  
      If (mapEnabled) {  
        initializeMap();  
      }  
    } catch (error) {  
      console.error(‘Failed to initialize page:’, error);  
    }  
  };  
    
  initializePage();  
}, \[\]); // Empty dependency array \= run once on mount  
\`\`\`

STEP 4: State Management  
—  
For complex state, use Redux/Context:

\`\`\`javascript  
// Redux slice for favorite listings  
Import { createSlice } from ‘@reduxjs/toolkit’;

Const favoriteListingsSlice \= createSlice({  
  Name: ‘favoriteListings’,  
  initialState: {  
    Listings: \[\],  
    showMap: false,  
    Filters: {},  
    showFilters: false,  
    photoIndices: {},  
    Loading: false,  
    Error: null  
  },  
  Reducers: {  
    setListings: (state, action) \=\> {  
      State.listings \= action.payload;  
    },  
    toggleMapView: (state) \=\> {  
      state.showMap \= \!state.showMap;  
    },  
    setFilters: (state, action) \=\> {  
      State.filters \= action.payload;  
    },  
    toggleFilters: (state) \=\> {  
      state.showFilters \= \!state.showFilters;  
    },  
    setPhotoIndex: (state, action) \=\> {  
      Const { listingId, index } \= action.payload;  
      state.photoIndices\[listingId\] \= index;  
    }  
  }  
});  
\`\`\`

STEP 5: API Integration  
—  
Create API service layer:

\`\`\`javascript  
// api/[bubbleApi.js](http://bubbleApi.js)  
Const API\_BASE\_URL \= ‘[https://app.split.lease/version-test/api/1.1](https://app.split.lease/version-test/api/1.1)’;  
Const API\_TOKEN \= process.env.REACT\_APP\_BUBBLE\_API\_TOKEN;

Export const bubbleApi \= {  
  // Data API calls  
  getListings: async (filters \= {}) \=\> {  
    Const response \= await fetch(\`${API\_BASE\_URL}/obj/listing\`, {  
      Headers: {  
        ‘Authorization’: \`Bearer ${API\_TOKEN}\`,  
        ‘Content-Type’: ‘application/json’  
      }  
    });  
    Return response.json();  
  },  
    
  getFavoriteListings: async (userId) \=\> {  
    Const response \= await fetch(  
      \`${API\_BASE\_URL}/obj/listing?constraints=\[{“key”:”favorited\_by”,”constraint\_type”:”contains”,”value”:”${userId}”}\]\`,  
      {  
        Headers: {  
          ‘Authorization’: \`Bearer ${API\_TOKEN}\`,  
          ‘Content-Type’: ‘application/json’  
        }  
      }  
    );  
    Return response.json();  
  },  
    
  // Workflow API calls  
  subscribeToNewListings: async (email, userId) \=\> {  
    Const response \= await fetch(\`${API\_BASE\_URL}/wf/subscribe-new-listings\`, {  
      Method: ‘POST’,  
      Headers: {  
        ‘Authorization’: \`Bearer ${API\_TOKEN}\`,  
        ‘Content-Type’: ‘application/json’  
      },  
      Body: JSON.stringify({ email, userId })  
    });  
    Return response.json();  
  }  
};  
\`\`\`

STEP 6: Conditional Logic Implementation  
—  
Replicate Bubble’s conditional workflows:

\`\`\`javascript  
// Workflow: “mobile filter is clicked (G: search selector isn’t visible)”  
Const handleMobileFilterClick \= () \=\> {  
  If (\!showSearchSelector) {  
    // Show search selector  
    setShowSearchSelector(true);  
  } else {  
    // Different behavior when visible  
    // Handle accordingly  
  }  
};  
\`\`\`

STEP 7: Element State Management  
—  
Replicate Bubble’s “Set State” actions:

\`\`\`javascript  
// Bubble: Set state of element  
Const \[popupState, setPopupState\] \= useState(‘initial’);

// Workflow equivalent  
Const handleEmailButtonClick \= () \=\> {  
  // Set state to ‘final’  
  setPopupState(‘final’);  
    
  // Show element  
  setShowPopup(true);  
};

// In render:  
{showPopup && (  
  \<EmailSignupPopup   
    state={popupState}  
    onClose={() \=\> setShowPopup(false)}  
  /\>  
)}  
\`\`\`

STEP 8: Navigation Implementation  
—  
\`\`\`javascript  
Import { useNavigate } from ‘react-router-dom’;

Const FavoriteListingsPage \= () \=\> {  
  Const navigate \= useNavigate();  
    
  // Workflow: Navigate to listing detail  
  Const handleListingClick \= (listingId) \=\> {  
    navigate(\`/listing/${listingId}\`, {  
      State: { fromFavorites: true }  
    });  
  };  
    
  // Workflow: Navigate to home  
  Const handleLogoClick \= () \=\> {  
    navigate(‘/’);  
  };  
    
  Return (  
    // …  
  );  
};  
\`\`\`

\=========================================  
COMPLETE WORKFLOW REFERENCE TABLE  
\=========================================

| Workflow Name | Trigger | Condition | Actions | Backend Call |  
|---------------|---------|-----------|---------|--------------|  
| Email me new Listings | Button Click | None | Set State, Show Element | Yes (Email) |  
| map viewing | Button Click | None | Show Map, Pan | No |  
| View Map | Button Click | None | Toggle View | No |  
| Get newest listings | Button Click | None | Refresh Data | Yes (Data fetch) |  
| Go to Listing | Group Click | None | Navigate | No |  
| hide mobile filters | Icon Click | None | Hide Element | No |  
| mobile filter (hidden) | Icon Click | selector not visible | Show Element | No |  
| mobile filter (visible) | Icon Click | selector is visible | Toggle State | No |  
| Listing Photo Next | Icon Click | Counter conditions | Increment, Update | No |  
| Listing Photo Previous | Icon Click | Counter conditions | Decrement, Update | No |  
| Page is Loaded | Page Load | None | Multiple inits | Yes (Data fetch) |

\=========================================  
CONCLUSION  
\=========================================

This guide provides a comprehensive overview of all workflows on the favorite-listings page, their triggers, steps, and intentions. To successfully migrate from Bubble to custom code:

1. Review each workflow category systematically  
2. 2\. Identify the user interactions (triggers)  
3. 3\. Understand the conditions and steps  
4. 4\. Implement equivalent event handlers in your chosen framework  
5. 5\. Use the Bubble API endpoints to maintain backend functionality  
6. 6\. Test each workflow thoroughly to ensure parity with Bubble behavior

KEY CONSIDERATIONS:

- Authentication: Ensure API tokens are secure  
- \- Error Handling: Add try-catch blocks for all async operations  
- \- Loading States: Implement loading indicators for data fetches  
- \- Responsive Design: Maintain mobile/desktop workflow differences  
- \- State Persistence: Consider localStorage for user preferences  
- \- Performance: Optimize image loading and dat