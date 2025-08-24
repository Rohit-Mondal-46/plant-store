import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { AddPlantForm } from '../components/AddPlantForm';
import { usePlants } from '../hooks/usePlants';
import { Leaf, ArrowLeft } from 'lucide-react';

export const AddPlantPage = () => {
  const navigate = useNavigate();
  const { addPlant, loading } = usePlants();

  const handleAddPlant = async (plantData) => {
    try {
      await addPlant(plantData);
      // Navigate back to home with success message
      navigate('/', { state: { message: 'Plant added successfully!' } });
    } catch (error) {
      console.error('Failed to add plant:', error);
      // Error handling is done in the AddPlantForm component
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Plants
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Plant</h1>
          </div>
          <p className="text-gray-600">
            Add a new plant to your collection. Fill in the details below.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <AddPlantForm onAddPlant={handleAddPlant} loading={loading} isModal={false} />
        </div>
      </main>
    </div>
  );
};
