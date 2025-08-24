import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { PlantCard } from '../components/PlantCard';
import { GridSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { usePlants } from '../hooks/usePlants';
import { CheckCircle, X } from 'lucide-react';

export const HomePage = () => {
  const location = useLocation();
  const { plants, loading, error, fetchPlants, purchasePlant, refetch } = usePlants();
  const [filters, setFilters] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle success message from navigation state
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the state to prevent message showing on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSearch = useCallback((search) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, search };
      fetchPlants(newFilters);
      return newFilters;
    });
  }, [fetchPlants]);

  const handleFilter = useCallback((filterOptions) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, ...filterOptions };
      fetchPlants(newFilters);
      return newFilters;
    });
  }, [fetchPlants]);

  const handlePurchase = useCallback(async (plantId, quantity) => {
    try {
      const result = await purchasePlant(plantId, quantity);
      setSuccessMessage(result.message || 'Plant purchased successfully!');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Purchase failed:', error);
      // You could add error handling here with a toast notification
    }
  }, [purchasePlant]);

  if (error && plants.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState message={error} onRetry={refetch} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-medium">{successMessage}</p>
            </div>
            <button
              onClick={() => setSuccessMessage('')}
              className="text-green-600 hover:text-green-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Plant
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our collection of beautiful plants to transform your home into a green paradise. 
            From easy-care succulents to statement tropical plants, we have something for everyone.
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          currentFilters={filters}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {loading ? 'Loading plants...' : `${plants.length} Plants Available`}
            </h3>
            {filters.search && (
              <p className="text-sm text-gray-600">
                Showing results for "{filters.search}"
              </p>
            )}
          </div>
        </div>

        {/* Plants Grid */}
        {loading && plants.length === 0 ? (
          <GridSkeleton />
        ) : plants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
            <p className="text-gray-600">
              {filters.search || (filters.category && filters.category.length > 0)
                ? "Try adjusting your search or filter criteria."
                : "No plants available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} onPurchase={handlePurchase} />
            ))}
          </div>
        )}

        {/* Loading overlay for subsequent requests */}
        {loading && plants.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-4 flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
              <span className="text-gray-700">Updating results...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
