import React from 'react';
import { Leaf, Sun, Droplet, ShoppingCart } from 'lucide-react';

export const PlantCard = ({ plant, onPurchase }) => {
  const {
    name,
    price,
    categories,
    quantity,
    description,
    image,
    difficulty,
    light
  } = plant;

  const isInStock = quantity > 0;

  const handlePurchase = () => {
    if (onPurchase && isInStock) {
      onPurchase(plant._id, 1); // Purchase 1 item by default
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLightIcon = (light) => {
    switch (light) {
      case 'Low':
        return <Droplet className="w-3 h-3" />;
      case 'Medium':
        return <Leaf className="w-3 h-3" />;
      case 'High':
        return <Sun className="w-3 h-3" />;
      default:
        return <Leaf className="w-3 h-3" />;
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
        {!isInStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 ml-2">
            {getLightIcon(light)}
            <span className="text-xs">{light}</span>
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md border border-emerald-200"
            >
              {category}
            </span>
          ))}
          {categories.length > 2 && (
            <span className="inline-block px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-200">
              +{categories.length - 2} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900">
              ${price}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-xs font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
              {isInStock ? `${quantity} in stock` : 'Out of Stock'}
            </div>
            {onPurchase && isInStock && (
              <button
                onClick={handlePurchase}
                className="bg-emerald-600 cursor-pointer text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
                title="Purchase Plant"
              >
                Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};