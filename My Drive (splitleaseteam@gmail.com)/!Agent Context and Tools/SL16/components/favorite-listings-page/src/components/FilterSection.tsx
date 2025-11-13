/**
 * FilterSection Component
 * Date range filter that updates pricing based on selected dates
 */

import { useState, useEffect } from 'react';
import '../styles/FilterSection.css';

export interface DateRange {
  checkIn: string;
  checkOut: string;
  nights: number;
}

export interface FilterSectionProps {
  onDateRangeChange: (dateRange: DateRange) => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  onDateRangeChange,
  initialCheckIn,
  initialCheckOut
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState(initialCheckOut || tomorrow);
  const [nights, setNights] = useState(1);

  // Calculate nights when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setNights(diffDays);
        onDateRangeChange({
          checkIn,
          checkOut,
          nights: diffDays
        });
      }
    }
  }, [checkIn, checkOut, onDateRangeChange]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    // Automatically adjust checkout if it's before new check-in
    if (checkOut && newCheckIn >= checkOut) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(e.target.value);
  };

  const handleClearDates = () => {
    setCheckIn(today);
    setCheckOut(tomorrow);
  };

  return (
    <div className="filter-section">
      <div className="filter-container">
        <h3 className="filter-title">Search Schedule</h3>

        <div className="date-filters">
          <div className="date-input-group">
            <label htmlFor="check-in">Check-In</label>
            <input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={handleCheckInChange}
              min={today}
              className="date-input"
            />
          </div>

          <div className="date-input-group">
            <label htmlFor="check-out">Check-Out</label>
            <input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={handleCheckOutChange}
              min={checkIn}
              className="date-input"
            />
          </div>

          <div className="nights-display">
            <span className="nights-label">Nights:</span>
            <span className="nights-value">{nights}</span>
          </div>

          <button className="clear-dates-btn" onClick={handleClearDates}>
            Clear
          </button>
        </div>

        <div className="filter-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Prices shown reflect the selected date range</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
