import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, ShoppingCart, Plus } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PlantShop</h1>
              <p className="text-xs text-gray-500">Green living made easy</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`transition-colors ${
                location.pathname === '/' 
                  ? 'text-emerald-600 font-medium' 
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              Plants
            </Link>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Care Guide</a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/add-plant"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/add-plant'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Plant
            </Link>
            <button className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};