/**
 * App Component
 * Root application component with routing
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavoriteListingsPage from './pages/FavoriteListingsPage';
import FavoriteListingsPageEnhanced from './pages/FavoriteListingsPageEnhanced';

function App() {
  return (
    <Router>
      <Routes>
        {/* Enhanced version with Header, Footer, Map, and Filter */}
        <Route path="/" element={<FavoriteListingsPageEnhanced />} />
        <Route path="/favorites" element={<FavoriteListingsPageEnhanced />} />
        {/* Basic version without Header/Footer */}
        <Route path="/basic" element={<FavoriteListingsPage />} />
        {/* Placeholder for listing detail route */}
        <Route path="/listing/:id" element={<div>Listing Detail Page (To be implemented)</div>} />
        {/* Placeholder for search/explore route */}
        <Route path="/search" element={<div>Search Page (To be implemented)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
