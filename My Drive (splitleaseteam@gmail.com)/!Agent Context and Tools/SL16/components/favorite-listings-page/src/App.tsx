/**
 * App Component
 * Root application component with routing
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavoriteListingsPage from './pages/FavoriteListingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FavoriteListingsPage />} />
        <Route path="/favorites" element={<FavoriteListingsPage />} />
        {/* Placeholder for listing detail route */}
        <Route path="/listing/:id" element={<div>Listing Detail Page (To be implemented)</div>} />
        {/* Placeholder for search/explore route */}
        <Route path="/search" element={<div>Search Page (To be implemented)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
