import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||'http://localhost:5000/api';

export const usePlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlants = useCallback(async (searchParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      
      if (searchParams.search) {
        queryParams.append('search', searchParams.search);
      }
      if (searchParams.category) {
        if (Array.isArray(searchParams.category)) {
          queryParams.append('category', searchParams.category.join(','));
        } else {
          // Handle single category 
          queryParams.append('category', searchParams.category);
        }
      }
      if (searchParams.inStock !== undefined) {
        queryParams.append('inStock', searchParams.inStock);
      }
      
      const url = `${API_BASE_URL}/plants${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      
      const data = await response.json();
      setPlants(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addPlant = async (plantData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/plants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add plant');
      }
      
      const data = await response.json();
      setPlants(prev => [data.data, ...prev]);
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const purchasePlant = async (plantId, quantity = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/plants/${plantId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to purchase plant');
      }
      
      const data = await response.json();
      
      // Update the plant in the local state
      setPlants(prev => prev.map(plant => 
        plant._id === plantId ? data.data : plant
      ));
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  return {
    plants,
    loading,
    error,
    fetchPlants,
    addPlant,
    purchasePlant,
    refetch: () => fetchPlants()
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_BASE_URL}/plants/meta/categories`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};