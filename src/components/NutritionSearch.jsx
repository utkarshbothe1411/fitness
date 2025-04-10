// components/NutritionSearch.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NutritionSearch() {
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const APP_ID = 'YOUR_APP_ID'; // Replace with your Edamam ID
  const APP_KEY = 'YOUR_APP_KEY'; // Replace with your Edamam key

  const fetchNutritionData = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setNutritionData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* ... (same JSX as earlier) ... */}
    </div>
  );
}