import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useCategories } from '../hooks/usePlants';

export const SearchAndFilter = ({ onSearch, onFilter, currentFilters }) => {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const [selectedCategories, setSelectedCategories] = useState(
    currentFilters.category ? 
      (Array.isArray(currentFilters.category) ? currentFilters.category : [currentFilters.category]) 
      : []
  );
  const [stockFilter, setStockFilter] = useState(currentFilters.inStock);
  const [showFilters, setShowFilters] = useState(false);
  
  const { categories } = useCategories();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  const handleCategoryChange = (category) => {
    let newSelectedCategories;
    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      newSelectedCategories = selectedCategories.filter(cat => cat !== category);
    } else {
      // Add category if not selected
      newSelectedCategories = [...selectedCategories, category];
    }
    
    setSelectedCategories(newSelectedCategories);
    onFilter({ 
      category: newSelectedCategories.length > 0 ? newSelectedCategories : undefined, 
      inStock: stockFilter 
    });
  };

  const handleStockFilterChange = (inStock) => {
    setStockFilter(inStock);
    onFilter({ 
      category: selectedCategories.length > 0 ? selectedCategories : undefined, 
      inStock 
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setStockFilter(undefined);
    onSearch('');
    onFilter({});
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0 || stockFilter !== undefined;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search plants by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-0.5">
                {[searchTerm, selectedCategories.length > 0, stockFilter !== undefined].filter(Boolean).length}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories {selectedCategories.length > 0 && (
                  <span className="text-emerald-600 text-xs">({selectedCategories.length} selected)</span>
                )}
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </label>
                ))}
                {categories.length === 0 && (
                  <p className="text-sm text-gray-500">No categories available</p>
                )}
              </div>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={stockFilter === undefined ? '' : stockFilter.toString()}
                onChange={(e) => handleStockFilterChange(
                  e.target.value === '' ? undefined : e.target.value === 'true'
                )}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              >
                <option value="">All Plants</option>
                <option value="true">In Stock Only</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};