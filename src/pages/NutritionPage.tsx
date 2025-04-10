import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface MacroNutrients {
  protein: string;
  carbs: string;
  fats: string;
}

interface Meal {
  meal: string;
  time: string;
  calories: number;
  items: string[];
  macros: MacroNutrients;
}

interface Superfood {
  name: string;
  benefits: string;
}

const defaultMealPlan: Meal[] = [
  {
    meal: "Breakfast",
    time: "7:00 AM",
    calories: 480,
    items: ["Thalipeeth with curd", "Sprouted Usal", "Green tea"],
    macros: { protein: "22g", carbs: "50g", fats: "15g" }
  },
  {
    meal: "Morning Snack",
    time: "10:00 AM",
    calories: 220,
    items: ["Roasted chana", "Aliv ladoo", "Sattu drink"],
    macros: { protein: "18g", carbs: "25g", fats: "12g" }
  },
  {
    meal: "Lunch",
    time: "1:00 PM",
    calories: 600,
    items: ["Bajra Bhakri", "Pithla", "Thecha", "Solkadhi"],
    macros: { protein: "40g", carbs: "60g", fats: "18g" }
  },
  {
    meal: "Afternoon Snack",
    time: "4:00 PM",
    calories: 180,
    items: ["Tilgul ladoo", "Buttermilk"],
    macros: { protein: "7g", carbs: "20g", fats: "9g" }
  },
  {
    meal: "Dinner",
    time: "7:00 PM",
    calories: 520,
    items: ["Varhadi Chicken", "Bhakri", "Steamed Vegetables", "Aam Panna"],
    macros: { protein: "45g", carbs: "35g", fats: "20g" }
  }
];

const localSuperfoods: Superfood[] = [
  { name: "Horse Gram (Kulith)", benefits: "High protein, helps digestion" },
  { name: "Aliv (Garden Cress Seeds)", benefits: "Rich in iron, great for hair growth" },
  { name: "Vaal (Field Beans)", benefits: "Packed with fiber, boosts immunity" },
  { name: "Tilgul (Sesame)", benefits: "Good for bones, rich in calcium" }
];

const NutritionPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [customMeals, setCustomMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState<Meal>({
    meal: "",
    time: "",
    calories: 0,
    items: [""],
    macros: { protein: "0g", carbs: "0g", fats: "0g" }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMacroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      macros: {
        ...prev.macros,
        [name]: value
      }
    }));
  };

  const handleItemChange = (index: number, value: string) => {
    const updatedItems = [...newMeal.items];
    updatedItems[index] = value;
    setNewMeal(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addItemField = () => {
    setNewMeal(prev => ({
      ...prev,
      items: [...prev.items, ""]
    }));
  };

  const removeItemField = (index: number) => {
    const updatedItems = newMeal.items.filter((_, i) => i !== index);
    setNewMeal(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeal.meal || !newMeal.time) return;
    
    setCustomMeals(prev => [...prev, newMeal]);
    setNewMeal({
      meal: "",
      time: "",
      calories: 0,
      items: [""],
      macros: { protein: "0g", carbs: "0g", fats: "0g" }
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 dark:bg-gray-900 dark:text-white min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Maharashtrian Meal Plan</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Customize Meal Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {defaultMealPlan.map((meal, index) => (
            <MealCard key={`default-${index}`} meal={meal} />
          ))}
          
          {customMeals.map((meal, index) => (
            <MealCard key={`custom-${index}`} meal={meal} />
          ))}
        </div>

        {/* Sidebar - Local Superfoods */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Maharashtrian Superfoods</h3>
          <ul className="space-y-3">
            {localSuperfoods.map((food, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-3">🌿</span>
                <div>
                  <p className="font-semibold">{food.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{food.benefits}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Create Meal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Custom Meal</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meal Type</label>
                <select
                  name="meal"
                  value={newMeal.meal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select meal type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Morning Snack">Morning Snack</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Afternoon Snack">Afternoon Snack</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                <input
                  type="text"
                  name="time"
                  value={newMeal.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 7:00 AM"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Calories</label>
                <input
                  type="number"
                  name="calories"
                  value={newMeal.calories || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Food Items</label>
                <div className="space-y-2">
                  {newMeal.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Food item"
                      />
                      {newMeal.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItemField(index)}
                          className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addItemField}
                    className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 flex items-center gap-1"
                  >
                    <Plus size={16} /> Add another item
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Protein</label>
                  <input
                    type="text"
                    name="protein"
                    value={newMeal.macros.protein}
                    onChange={handleMacroChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 20g"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Carbs</label>
                  <input
                    type="text"
                    name="carbs"
                    value={newMeal.macros.carbs}
                    onChange={handleMacroChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 50g"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fats</label>
                  <input
                    type="text"
                    name="fats"
                    value={newMeal.macros.fats}
                    onChange={handleMacroChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 15g"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Meal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{meal.meal}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{meal.time}</p>
        </div>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-full text-sm">
          {meal.calories} cal
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
            <p className="font-semibold text-gray-900 dark:text-white">{meal.macros.protein}</p>
          </div>
          <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
            <p className="font-semibold text-gray-900 dark:text-white">{meal.macros.carbs}</p>
          </div>
          <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Fats</p>
            <p className="font-semibold text-gray-900 dark:text-white">{meal.macros.fats}</p>
          </div>
        </div>

        <ul className="space-y-2">
          {meal.items.map((item, idx) => (
            <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="mr-2">🍽️</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NutritionPage;