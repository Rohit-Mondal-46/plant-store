import React, { useState } from 'react';
import { Plus, X, Leaf } from 'lucide-react';

export const AddPlantForm = ({ onAddPlant, loading, isModal = true }) => {
  const [isOpen, setIsOpen] = useState(!isModal); 
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: [''],
    quantity: '',
    description: '',
    image: '',
    light: 'Medium'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Plant name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Plant name must be less than 100 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0 || !Number.isInteger(Number(formData.quantity))) {
      newErrors.quantity = 'Quantity must be a non-negative integer';
    }

    const validCategories = formData.categories.filter(cat => cat.trim());
    if (validCategories.length === 0) {
      newErrors.categories = 'At least one category is required';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const validCategories = formData.categories.filter(cat => cat.trim());
      await onAddPlant({
        ...formData,
        categories: validCategories,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      });
      
      setFormData({
        name: '',
        price: '',
        categories: [''],
        quantity: '',
        description: '',
        image: '',
        light: 'Medium'
      });
      setErrors({});
      if (isModal) {
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Failed to add plant:', error);
    }
  };

  const addCategoryField = () => {
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, '']
    }));
  };

  const removeCategoryField = (index) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  const updateCategory = (index, value) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.map((cat, i) => i === index ? value : cat)
    }));
  };

  if (!isOpen && isModal) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-200 z-50"
      >
        <Plus className="w-6 h-6" />
      </button>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plant Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="e.g., Money Plant"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price (₹) *
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${
            errors.price ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="25.99"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity in Stock *
        </label>
        <input
          type="number"
          min="0"
          value={formData.quantity}
          onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${
            errors.quantity ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="e.g., 25"
        />
        {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories *
        </label>
        {formData.categories.map((category, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={category}
              onChange={(e) => updateCategory(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              placeholder="e.g., indoor, home decor, air purifying"
            />
            {formData.categories.length > 1 && (
              <button
                type="button"
                onClick={() => removeCategoryField(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addCategoryField}
          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
        >
          + Add another category
        </button>
        {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Brief description of the plant..."
          maxLength={500}
        />
        <div className="flex justify-between mt-1">
          {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          <p className="text-sm text-gray-500">{formData.description.length}/500</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          placeholder="https://example.com/plant-image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sun Light Requirement
        </label>
        <select
          value={formData.light}
          onChange={(e) => setFormData(prev => ({ ...prev, light: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        {isModal && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Adding...' : 'Add Plant'}
        </button>
      </div>
    </form>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-semibold text-gray-900">Add New Plant</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return formContent;
};