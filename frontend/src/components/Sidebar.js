import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ dateFilter, setDateFilter, filterType, setFilterType, searchTerm, setSearchTerm }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleFilterChange = (newFilterType) => {
    setDateFilter(''); // Clear date filter when changing filters
    setFilterType(newFilterType); // Update filter type based on user selection
  };

  const handleClearFilters = () => {
    setDateFilter(''); // Clear the date filter
    setFilterType(''); // Reset filter type
    setSearchTerm(''); // Clear search term
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100 h-screen shadow-md">
      <input 
        type="text" 
        placeholder="Search" 
        className="p-2 w-full rounded border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
      />
      <h2 className="text-lg font-semibold mb-2">Tasks</h2>
      
      {/* Date Filter Input */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Date Filter:</label>
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul className="space-y-2">
        <li 
          className={`py-2 hover:text-blue-500 cursor-pointer ${filterType === 'upcoming' ? 'font-semibold text-blue-600' : ''}`} 
          onClick={() => handleFilterChange('upcoming')}
        >
          Upcoming
        </li>
        <li 
          className={`py-2 hover:text-blue-500 cursor-pointer ${filterType === 'today' ? 'font-semibold text-blue-600' : ''}`} 
          onClick={() => handleFilterChange('today')}
        >
          Today
        </li>
        <li 
          className={`py-2 hover:text-blue-500 cursor-pointer ${filterType === 'past' ? 'font-semibold text-blue-600' : ''}`} 
          onClick={() => handleFilterChange('past')}
        >
          Past
        </li>
      </ul>

      {/* Clear Filters Button */}
      <button 
        className="w-full py-2 bg-gray-300 text-gray-800 rounded mt-2 hover:bg-gray-400 transition duration-200"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>

      <button className="w-full py-2 bg-red-500 text-white rounded mt-2 hover:bg-red-600 transition duration-200" onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
